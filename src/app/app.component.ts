import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { ApiService } from './shared/services/api/api.service';
import { addBoard, deleteBoard, fetchBoards, updateBoard,  } from './shared/state/board.actions';
import { v4 as uuidv4 } from 'uuid'
import { IBoard } from './shared/models/board';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {InputSwitchModule} from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    MatSidenavModule,
    MatListModule,
    CommonModule,
    FormsModule,
    MatIconModule,
    InputSwitchModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'kanbanTaskManagement';
  boards = ['Platform Launch', 'Marketing Plan', 'Roadmap']
  board:IBoard = {id:uuidv4(),name:'test board name',columns:[]}
  selectedBoard = 'Platform Launch'
  checked: boolean  = true
  constructor(
    private store:Store,
    private apiService:ApiService,  
  ) {
      this.store.dispatch(fetchBoards());
  }

  toggleTheme(){
    this.checked = !this.checked;
    console.log('theme toggled to :', this.checked);
  }
  addBoard(){
    this.store.dispatch(addBoard({board:this.board}))
  }

  updateBoard(){
    this.store.dispatch(updateBoard({board:{id:'',name:'',columns:[]}}))
  }

  deleteBoard(){
    this.store.dispatch(deleteBoard({id:''}))
  }

  selectBoard(boardName: string){
    this.selectedBoard = boardName
    console.log(boardName)
  }
}
