// src/app/overlay-menu.service.ts
import { Injectable, ElementRef } from '@angular/core';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  private overlayRef: OverlayRef | null = null;

  constructor(private overlay: Overlay) { }

  open(elRef: ElementRef, component: any): OverlayRef {
    const overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-dark-backdrop',
      positionStrategy: this.overlay.position()
        .flexibleConnectedTo(elRef)
        .withPositions([{ originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' }]),
      // scrollStrategy: this.overlay.scrollStrategies.reposition() // Maintain scrollbar visibility
      scrollStrategy: this.overlay.scrollStrategies.block()  // block scrolling
    });

    this.overlayRef = this.overlay.create(overlayConfig);
    const componentPortal = new ComponentPortal(component);
    this.overlayRef.attach(componentPortal);

    this.overlayRef.backdropClick().subscribe(() => this.close());
    return this.overlayRef;
  }

  close() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
}
