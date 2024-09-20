import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MenuModule } from 'primeng/menu';
import { MatDialog } from '@angular/material/dialog';
import { TaskModalComponent } from '../modals/task-modal/task-modal.component';
import { DataService } from '../../shared/services/data/data.service';
import { Store } from '@ngrx/store';
import { deleteBoard } from '../../shared/state/board.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule,MatButtonModule,MenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass'
})

export class HeaderComponent {

constructor(public dataService:DataService,public dialog: MatDialog, private store: Store){}

  toggleMenu() {
    console.log(this.dataService.showDropdown)
    this.dataService.showDropdown = !this.dataService.showDropdown
  }
  openDialog() {
    console.log('dialog open')
    const dialogRef = this.dialog.open(TaskModalComponent);
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
  deleteBoard(){
    this.dataService.deleteBoard()
  }
}
