import { Component, ElementRef, EventEmitter, OnInit, output, Output } from '@angular/core';
import { HeaderLandingPageComponent } from '../header-landing-page/header-landing-page.component';
import { FooterComponent } from '../footer/footer.component';
import { SliderEventComponent } from '../slider-event/slider-event.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

// import AOS from 'aos';
// import 'aos/dist/aos.css';

// import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-landing-page-inicio',
    imports: [
        HeaderLandingPageComponent,
        FooterComponent,
        SliderEventComponent,
        FontAwesomeModule,
        FormsModule,
        NgClass,
    ],
    templateUrl: './landing-page-inicio.component.html',
    styleUrl: './landing-page-inicio.component.css'
})
export class LandingPageInicioComponent {
  isOpen1 = false;
  isOpen2 = false;
  isOpen3 = false;
  // @Output() themeChange = new EventEmitter<string>(); // Emite o tema atual
  novo:any
  theme: any ='dark'== localStorage.getItem('theme');
  onThemeChange() {
    this.novo= 'light';
  }
  // ngOnInit() {
  //   AOS.init({ disable: 'mobile' }); //AOS - 2
  //   AOS.refresh(); //refresh method is called on window resize and so on, as it doesn't require to build new store with AOS elements and should be as light as possible.
  // }
  toggleAccordion(panel: number) {
    switch (panel) {
      case 1:
        this.isOpen1 = !this.isOpen1;
        break;
      case 2:
        this.isOpen2 = !this.isOpen2;
        break;
      case 3:
        this.isOpen3 = !this.isOpen3;
        break;
      default:
        break;
    }
  }

  constructor(private el: ElementRef) {
    console.log(this.theme);
  }

  // Método para lidar com o clique no link
  scrollToTarget() {
    // Obtém a posição do elemento de destino
    const targetElement = this.el.nativeElement.querySelector('#targetElement');
    const targetOffset = targetElement.offsetTop - 400; // 400px da parte superior da página

    // Rola a página para a posição do elemento de destino
    window.scrollTo({
      top: targetOffset,
      behavior: 'smooth', // Rola suavemente
    });
  }
   hideMenu: boolean = false;

  updateHideMenu(newValue: boolean): void {
    this.hideMenu = newValue;
  }
}
