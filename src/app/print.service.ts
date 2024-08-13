import { Injectable } from '@angular/core';
import { Observable, fromEvent, throwError } from 'rxjs';
import { finalize, take, catchError } from 'rxjs/operators';

interface PrintOptions {
  styleUrls: string[];
  inlineStyles?: string;
  onComplete?: () => void;
  onError?: (error: any) => void;
}

@Injectable({
  providedIn: 'root',
})
export class PrintService {

  private removeUnsafeTags(element: HTMLElement) {
    element.querySelectorAll('script, link[rel="import"]').forEach(elem => elem.remove());
  }

  private validateOptions(options: PrintOptions) {
    if (!options.styleUrls.length) {
      throw new Error('Invalid options: at least one styleUrl must be provided.');
    }
  }

  public printContent(htmlContent: HTMLElement, options: PrintOptions): Observable<void> {
    if (!(htmlContent instanceof HTMLElement)) {
      throw new Error('Invalid HTML content: Must be an HTMLElement.');
    }

    this.validateOptions(options);

    const printFrame = document.createElement('iframe');
    printFrame.style.display = 'none';
    document.body.appendChild(printFrame);

    const safeContent = htmlContent.cloneNode(true) as HTMLElement;
    this.removeUnsafeTags(safeContent);

    return new Observable<void>(observer => {
      const load$ = fromEvent(printFrame, 'load').pipe(take(1));
      const error$ = fromEvent(printFrame, 'error').pipe(take(1));

      load$.subscribe({
        next: () => {
          try {
            printFrame.contentWindow.print();
            options.onComplete?.();
            observer.next();
            observer.complete();
          } catch (error) {
            this.handleError(printFrame, error, observer, options);
          }
        }
      });

      error$.subscribe({
        next: (error) => {
          this.handleError(printFrame, error, observer, options);
        }
      });

      const stylesheets = options.styleUrls.map(url => `<link rel="stylesheet" href="${url}" media="print">`).join('');
      const inlineStyle = options.inlineStyles ? `<style>${options.inlineStyles}</style>` : '';

      // <img src="../../../../assets/images/logo-parcelas-st2.png" alt="">
      printFrame.contentDocument.write(`
        <html>
          <head>

            <title>
            </title>
            ${stylesheets}
            ${inlineStyle}
          </head>
          <header>Esto es el header</header>
          <body>${safeContent.outerHTML}</body>
          <footer> este es el footer</footer>
        </html>
      `);
      printFrame.contentDocument.close();
    }).pipe(
      catchError(error => throwError(error)),
      finalize(() => document.body.removeChild(printFrame))
    );
  }

  private handleError(printFrame: HTMLIFrameElement, error: any, observer: any, options: PrintOptions) {
    console.error('Error:', error);
    options.onError?.(error);
    observer.error(error);
  }
}
