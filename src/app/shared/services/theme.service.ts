import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private darkClass = 'dark';

    constructor() {
        this.loadTheme();
    }

    toggleTheme(): void {
        const root = document.documentElement;
        if (root.classList.contains(this.darkClass)) {
            root.classList.remove(this.darkClass);
            localStorage.setItem('theme', 'light');
        } else {
            root.classList.add(this.darkClass);
            localStorage.setItem('theme', 'dark');
        }
    }

    loadTheme(): void {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
            document.documentElement.classList.add(this.darkClass);
        } else {
            document.documentElement.classList.remove(this.darkClass);
        }
    }
}
