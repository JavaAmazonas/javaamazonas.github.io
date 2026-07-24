import {
  Component,
  HostListener,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';

@Component({
    selector: 'app-slider-event',
    imports: [FormsModule, CommonModule],
    templateUrl: './slider-event.component.html',
    styleUrl: './slider-event.component.css'
})
export class SliderEventComponent {
  @Input() cards: any[] = [
    {
      id: 1,
      evento: true,
      typeMembro: 'Ja aconteceu',
      Title: 'Primeiro evento da comunidade',
      desc: 'Abertura e Boas-Vindas: Damos as boas-vindas a todos os participantes e introduzimos a comunidade Java',
      imgPath: '../../../assets/encontro.jpeg',
      imgAutor: '../../../assets/doke.png',
      link: 'https://discord.com/invite/drYCpFH75g',
      nomes: 'Samuelson',
      datas: 'Novembro 20, 2023 - online',
    },
    {
      id: 2,
      evento: true,
      typeMembro: 'Ja aconteceu - Workshop',
      Title: 'Como criar uma API com SpringBoot + MongoDB',
      desc: 'Elian diretamente de Itacoatiara-AM, mostrou como criar uma API com SpringBoot + MongoDB',
      imgPath: '../../../assets/encontro2.jpeg',
      imgAutor: '../../../assets/doke.png',
      nomes: 'Samuelson',
      link: 'https://github.com/Elian-beep/appstore',
      datas: 'Janeiro 19, 2024 - online',
    },
    {
      id: 3,
      evento: false,
      typeMembro: 'Vai acontecer',
      Title: 'Como criar um comunidade mais engajada?',
      desc: 'Queremos convidá-lo a fazer parte de uma jornada emocionante e enriquecedora para construir uma comunidade mais engajada, vibrante e colaborativa. TEMAS: participação ativa,colaboração e cooperação, feedback Construtivo #comunidadeMaisEngajada #colaboração #diversidade #inclusão',
      imgPath: '../../../assets/event-java.jpeg',
      imgAutor: '../../../assets/doke.png',
      nomes: 'Samuelson',
      datas: 'Em breve',
    },
    {
      id: 4,
      evento: false,
      typeMembro: 'Vai acontecer',
      Title: 'Porque linux mudou nossa forma de programar?',
      desc: 'Desde sua concepção nas mãos do visionário Linus Torvalds em 1991, o Linux tem sido mais do que apenas um sistema operacional. Ele se tornou uma revolução tecnológica que mudou fundamentalmente a forma como programamos e interagimos com a tecnologia. Aqui está como o Linux transformou nossa abordagem à programação.',
      imgPath: '../../../assets/linux.jpeg',
      imgAutor: '../../../assets/doke.png',
      nomes: 'Samuelson',
      datas: 'Em breve',
    },
  ]; // Array of card data objects
  @Output() navigate = new EventEmitter<string>(); // Event to emit navigation direction

  currentIndex = 0; // Index of the currently displayed card

  onNavigate(direction: string) {
    if (direction === 'next' && this.currentIndex < this.cards.length - 1) {
      this.currentIndex += 2;
    } else if (direction === 'prev' && this.currentIndex > 0) {
      this.currentIndex -= 2;
    }
    this.navigate.emit(direction);
  }
}
