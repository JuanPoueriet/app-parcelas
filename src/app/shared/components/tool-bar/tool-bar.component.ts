import { Component } from '@angular/core';
import { ThemeService } from '../../../theme.service';

@Component({
  selector: 'shared-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrl: './tool-bar.component.scss'
})
export class ToolBarComponent {
  constructor(public themeService: ThemeService) {}

  // constructor(private themeService: ThemeService) {}

  toggleTheme() {
    const darkMode = document.body.classList.contains('dark-theme');
    this.themeService.toggleTheme(!darkMode);
  }

}
