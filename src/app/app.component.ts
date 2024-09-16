import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { ApiService } from './shared/services/api/api.service';
import { addBoard, deleteBoard, fetchBoards, updateBoard,  } from './shared/state/board.actions';
import { v4 as uuidv4 } from 'uuid'
import { IBoard } from './shared/models/board';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'kanbanTaskManagement';
  board:IBoard = {id:uuidv4(),name:'test board name',columns:[]}
  constructor(
    private store:Store,
    private apiService:ApiService,  
  ) {
      this.store.dispatch(fetchBoards());
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
}
