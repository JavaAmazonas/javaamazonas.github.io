import { Component } from '@angular/core';
import { HeaderLandingPageComponent } from '../page/header-landing-page/header-landing-page.component';
import { FooterComponent } from '../page/footer/footer.component';

@Component({
    selector: 'app-not-found',
    imports: [HeaderLandingPageComponent, FooterComponent],
    templateUrl: './not-found.component.html',
    styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

}
