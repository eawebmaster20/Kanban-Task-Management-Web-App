import { Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MenuModule } from 'primeng/menu';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskModalComponent } from '../modals/task-modal/task-modal.component';
import { DataService } from '../../shared/services/data/data.service';
import { Store } from '@ngrx/store';
import { deleteBoard } from '../../shared/state/board.actions';
import { IBoard, ITask } from '../../shared/models/board';
import { CreateBoardComponent } from '../modals/create-board/create-board.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule,MatButtonModule,MenuModule,MatDialogModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass'
})

export class HeaderComponent {
constructor(public dataService:DataService,public dialog: MatDialog, private store: Store){
}

  toggleMenu() {
    console.log(this.dataService.showDropdown)
    this.dataService.showDropdown = !this.dataService.showDropdown
  }
  openBoardDialog(board?:IBoard) {
    console.log('dialog open')
    const dialogRef = this.dialog.open(CreateBoardComponent,{
      data:board
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
  openTaskDialog(task?:ITask) {
    console.log('dialog open')
    const dialogRef = this.dialog.open(TaskModalComponent,{
      data:task
    });
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
