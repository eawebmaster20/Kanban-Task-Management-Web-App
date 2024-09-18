import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MenuModule } from 'primeng/menu';
import { HostService } from '../../shared/services/host/host.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateBoardComponent } from '../modals/create-board/create-board.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule,MatButtonModule,MenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass'
})

export class HeaderComponent {

constructor(public hostService:HostService,public dialog: MatDialog){}

  toggleMenu() {
    console.log(this.hostService.showDropdown)
    this.hostService.showDropdown = !this.hostService.showDropdown
  }
  openDialog() {
    console.log('dialog open')
    const dialogRef = this.dialog.open(CreateBoardComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  logoImg(){
    return 'assets/images/logo.png';
    // <img src="../../../assets/icons/logo-dark.svg" alt="" srcset="">
    // <img src="../../../assets/icons/logo-light.svg" alt="" srcset="">
    // <img src="../../../assets/icons/logo-mobile.svg" alt="" srcset="">
  }
}
