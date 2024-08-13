// theme.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  toggleTheme(isDarkMode: boolean) {
    const hostClass = 'dark-theme';
    const body = document.body;

    if (isDarkMode) {
      body.classList.add(hostClass);
    } else {
      body.classList.remove(hostClass);
    }
  }
}
