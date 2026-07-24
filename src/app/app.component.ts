import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingPageInicioComponent } from './page/landing-page-inicio/landing-page-inicio.component';
import { HeaderLandingPageComponent } from './page/header-landing-page/header-landing-page.component';
import { NotFoundComponent } from './not-found/not-found.component';

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        LandingPageInicioComponent,
        HeaderLandingPageComponent,
        NotFoundComponent,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
   sunIcon: HTMLElement | null = null;
  moonIcon: HTMLElement | null = null;
  userTheme: string | null = null;
  systemTheme!: boolean;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.sunIcon = document.querySelector('.sun');
    this.moonIcon = document.querySelector('.moon');

    // Verifica o tema do usuário no localStorage
    this.userTheme = localStorage.getItem('theme');

    // Verifica o esquema de cores preferido do sistema
    this.systemTheme = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    // Verifica e aplica o tema inicial
    this.themeCheck();
  }

  iconToggle() {
    if (this.sunIcon && this.moonIcon) {
      this.sunIcon.classList.toggle('display-none');
      this.moonIcon.classList.toggle('display-none');
    }
  }

  themeCheck() {
    if (this.userTheme === 'dark' || (!this.userTheme && this.systemTheme)) {
      this.renderer.addClass(document.documentElement, 'dark');
      if (this.moonIcon) this.renderer.addClass(this.moonIcon, 'display-none');
    } else {
      this.renderer.addClass(document.documentElement, 'light');
      if (this.sunIcon) this.renderer.addClass(this.sunIcon, 'display-none');
    }
  }

  themeSwitch() {
    if (document.documentElement.classList.contains('dark')) {
      this.renderer.removeClass(document.documentElement, 'dark');
      this.renderer.addClass(document.documentElement, 'light');
      localStorage.setItem('theme', 'light');
    } else {
      this.renderer.removeClass(document.documentElement, 'light');
      this.renderer.addClass(document.documentElement, 'dark');
      localStorage.setItem('theme', 'dark');
    }
    this.iconToggle();
  }

  chamada() {
    if (this.sunIcon && this.moonIcon) {
      this.sunIcon.addEventListener('click', () => this.themeSwitch());
      this.moonIcon.addEventListener('click', () => this.themeSwitch());
    }
  }
}
