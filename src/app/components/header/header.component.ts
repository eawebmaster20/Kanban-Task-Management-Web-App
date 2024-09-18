import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MenuModule } from 'primeng/menu';
import { HostService } from '../../shared/services/host/host.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule,MatButtonModule,MenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass'
})

export class HeaderComponent {

constructor(public hostService:HostService){}

  toggleMenu() {
    console.log(this.hostService.showDropdown)
    this.hostService.showDropdown = !this.hostService.showDropdown
  }
  logoImg(){
    return 'assets/images/logo.png';
    // <img src="../../../assets/icons/logo-dark.svg" alt="" srcset="">
    // <img src="../../../assets/icons/logo-light.svg" alt="" srcset="">
    // <img src="../../../assets/icons/logo-mobile.svg" alt="" srcset="">
  }
}
