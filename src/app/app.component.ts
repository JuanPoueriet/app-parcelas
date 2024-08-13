import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ScrollContainerService } from './scroll-container.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  @ViewChild('scrollableContainer') private scrollableContainer!: ElementRef;

  constructor(private scrollContainerService: ScrollContainerService) {}

  ngAfterViewInit() {
    this.scrollContainerService.setContainer(this.scrollableContainer.nativeElement);
  }
}