import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { IBoard } from '../../models/board';
import { Store } from '@ngrx/store';
import { getRandomColor } from '../../utils/colorGenerator';
import { deleteBoard, selectBoard } from '../../state/board.actions';
import { selectAllBoards } from '../../state/board.selectors';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // selectedBoard!: BehaviorSubject<any>
  selectedBoard = new BehaviorSubject<IBoard | null>(null)
  colorList:string[] =[]
  showDropdown = false;
  constructor(private store:Store) { }

  selectBoard(board: IBoard){
    board.columns.forEach(element => {
      this.colorList.push(getRandomColor())
    });
    this.selectedBoard.next(board)
    localStorage.setItem('selectedBoard',JSON.stringify(board))
    this.store.dispatch(selectBoard({board}));
  }

  deleteBoard(){
    this.store.dispatch(deleteBoard({id:this.selectedBoard.getValue()!.id}))
    this.store.select(selectAllBoards).pipe(
      take(1),
    ).subscribe(boards=>{
      this.selectBoard(boards[0])
    })
  }
}
