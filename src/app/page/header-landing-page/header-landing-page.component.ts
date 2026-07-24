import { Component, ElementRef, EventEmitter, Input, input, Output, ChangeDetectionStrategy } from '@angular/core';
import { ButtonToggleDarkLightComponent } from '../button-toggle-dark-light/button-toggle-dark-light.component';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-header-landing-page',
    imports: [ButtonToggleDarkLightComponent, NgClass],
    templateUrl: './header-landing-page.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './header-landing-page.component.css'
})
export class HeaderLandingPageComponent {
   activeLink: any= 'inicio';
  inicio() {
    document.getElementById('inicio')?.scrollIntoView({ behavior: 'smooth' });
    if (window.innerWidth < 10) {
      this.toggleMenu();
    }
    this.activeLink = 'inicio';
  }
  porqueJava() {
    document
      .getElementById('porqueJava')
      ?.scrollIntoView({ behavior: 'smooth' });
    if (window.innerWidth < 1024) {
      this.toggleMenu();
    }
    this.activeLink = 'porqueJava';
  }
  sobre() {
    document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' });
    if (window.innerWidth < 1024) {
      this.toggleMenu();
    }
    this.activeLink = 'sobre'
     // Ativa a classe dark:text-white

  }
  evento() {
    document.getElementById('evento')?.scrollIntoView({ behavior: 'smooth' });
    if (window.innerWidth < 1024) {
      this.toggleMenu();
    }
    this.activeLink = 'evento';
  }
  contato() {
    document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
    if (window.innerWidth < 1024) {
      this.toggleMenu();
    }
    this.activeLink = 'contato';
  }

  // Método para remover a classe 'hidden'
  toggleMenu() {
    const mobileMenu = document.getElementById('mobile-menu-2');
    if (mobileMenu) {
      mobileMenu.classList.toggle('hidden');
    }
  }

}
