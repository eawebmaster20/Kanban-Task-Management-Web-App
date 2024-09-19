import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { ApiService } from './shared/services/api/api.service';
import { addBoard, deleteBoard, fetchBoards, selectBoard, updateBoard,  } from './shared/state/board.actions';
import { v4 as uuidv4 } from 'uuid'
import { IBoard } from './shared/models/board';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { AsyncPipe, CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {InputSwitchModule} from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { ModalDirective } from './shared/directives/modal.directive';
import { selectAllBoards, selectSelectedBoard } from './shared/state/board.selectors';
import { CreateBoardComponent } from './components/modals/create-board/create-board.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from './shared/services/data/data.service';
import { getRandomColor } from './shared/utils/colorGenerator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    MatSidenavModule,
    MatListModule,
    AsyncPipe,
    CommonModule,
    FormsModule,
    MatIconModule,
    InputSwitchModule,
    HeaderComponent,
    ModalDirective,
    CreateBoardComponent
  ],
  
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'kanbanTaskManagement';
  boards = ['Platform Launch', 'Marketing Plan', 'Roadmap']
  board:IBoard = {id:uuidv4(),name:'test board name',columns:[]}
  checked: boolean  = true
  allStoreBoards = selectAllBoards
  selectedBoard = selectSelectedBoard
  constructor(
    public store:Store,
    public dialog: MatDialog,
    private dataService:DataService
  ) {
      this.store.dispatch(fetchBoards());
  }

  toggleTheme(){
    this.checked = !this.checked;
    console.log('theme toggled to :', this.checked);
  }

  deleteBoard(){
    this.store.dispatch(deleteBoard({id:''}))
  }

  selectBoard(board: IBoard){
    board.columns.forEach(element => {
      this.dataService.colorList.push(getRandomColor())
    });
    this.dataService.selectedBoard.next(board)
    localStorage.setItem('selectedBoard',JSON.stringify(board))
    this.store.dispatch(selectBoard({board}));
  }

  openDialog() {
    console.log('dialog open')
    const dialogRef = this.dialog.open(CreateBoardComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
