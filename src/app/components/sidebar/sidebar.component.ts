import { Component } from '@angular/core';
import { ThemeTogglerComponent } from '../theme-toggler/theme-toggler.component';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../../shared/services/data/data.service';
import { MatListModule } from '@angular/material/list';
import { Store } from '@ngrx/store';
import { selectAllBoards, selectSelectedBoard } from '../../shared/state/board.selectors';
import { AsyncPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CreateBoardComponent } from '../modals/create-board/create-board.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    ThemeTogglerComponent,
    MatIconModule,
    MatListModule,
    AsyncPipe,
    CreateBoardComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.sass'
})
export class SidebarComponent {
  allStoreBoards = selectAllBoards
  selectedBoard = selectSelectedBoard
  constructor(
    public dataService:DataService,
    public store:Store,
    public dialog: MatDialog,
  ){}


  openDialog() {
    console.log('dialog open')
    const dialogRef = this.dialog.open(CreateBoardComponent,{
      panelClass: this.dataService.checked ? 'dark-card': 'light-card'
    });
    dialogRef.afterClosed().subscribe({
      next: (res) =>  {
        if(!res.update){
          this.dataService.createBoard(res.data)
        }
      },
      error: (err) => console.error('Error:', err)
    });
  }
}
