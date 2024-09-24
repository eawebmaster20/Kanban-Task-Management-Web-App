import { Component, inject, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MenuModule } from 'primeng/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskModalComponent } from '../modals/task-modal/task-modal.component';
import { DataService } from '../../shared/services/data/data.service';
import { Store } from '@ngrx/store';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MediaMatcher } from '@angular/cdk/layout';
import { IBoard, ITask } from '../../shared/models/board';
import { CreateBoardComponent } from '../modals/create-board/create-board.component';
import { ConfirmDeleteComponent } from '../modals/confirm-delete/confirm-delete.component';
import { Subject, takeUntil } from 'rxjs';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule,MatButtonModule,MenuModule,MatDialogModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass'
})

export class HeaderComponent implements OnInit {
  private destroy$ = new Subject<void>();
constructor(
  public dataService:DataService,
  public dialog: MatDialog, 
  private store: Store){}

  ngOnInit() {
  }
  toggleMenu() {
    console.log(this.dataService.showDropdown)
    this.dataService.showDropdown = !this.dataService.showDropdown
  }
  openBoardDialog(board?:IBoard) {
    console.log('dialog open')
    const dialogRef = this.dialog.open(CreateBoardComponent,{
      data:board,
      panelClass: this.dataService.checked ? 'dark-card': 'light-card'
    });
    dialogRef.afterClosed().subscribe({
      next: (res) =>  {
        if(res.update){
          this.dataService.deleteBoard()
          this.dataService.createBoard(res.data)
        }
      },
      error: (err) => console.error('Error:', err)
    });
  }
  
  openTaskDialog(task?:ITask) {
    console.log('dialog open')
    const dialogRef = this.dialog.open(TaskModalComponent,{
      data:task,
      panelClass: this.dataService.checked ? 'dark-card': 'light-card'
    });
    dialogRef.afterClosed().subscribe(
      {
        next: (result) => {
          if(result && this.dataService.selectedBoard.getValue()){
            let data = this.dataService.selectedBoard.getValue();
            this.dataService.deleteBoard()
            this.dataService.createBoard(data!)
          }
          else{
            console.log('cancel');
          }
        },
        error: (err) => console.error('Error:', err)
      }
    )
  }
  // openTaskDialog(task?:ITask){
  //   this.dialog.open(SidebarComponent, {
  //     position: {
  //       top: '80px',
  //     },
  //   });
  // }
  deleteBoard(){
    this.dialog.open(ConfirmDeleteComponent);
  }

  logoSrc(){
    if (window.innerWidth >= 768) {
      return this.dataService.checked ? 'assets/icons/logo-light.svg' : 'assets/icons/logo-dark.svg';
    } else {
      return 'assets/icons/logo-mobile.svg';
    }
  }
}
