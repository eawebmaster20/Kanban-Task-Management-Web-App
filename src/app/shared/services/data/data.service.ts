import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { IBoard } from '../../models/board';
import { Store } from '@ngrx/store';
import { getRandomColor } from '../../utils/colorGenerator';
import { addBoard, deleteBoard, selectBoard, updateBoard } from '../../state/board.actions';
import { selectAllBoards } from '../../state/board.selectors';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  selectedBoard = new BehaviorSubject<IBoard | null>(null)
  colorList:string[] =[]
  checked: boolean  = true
  sidebarState="opened"
  showDropdown = false;
  constructor(private store:Store) { }

  selectBoard1(board: IBoard){
    board.columns.forEach(element => {
      this.colorList.push(getRandomColor())
    });
    localStorage.setItem('selectedBoard',JSON.stringify(board))
    this.selectedBoard.next(JSON.parse(localStorage.getItem('selectedBoard')!));
    this.store.dispatch(selectBoard({board}));
  }
  selectBoard(board: IBoard){
    // let tempBoard = JSON.parse(localStorage.getItem('selectedBoard')!) as IBoard || board;
    board.columns.forEach(element => {
      this.colorList.push(getRandomColor())
    });
    localStorage.setItem('selectedBoard',JSON.stringify(board))
    this.selectedBoard.next(JSON.parse(localStorage.getItem('selectedBoard')!));
    this.store.dispatch(selectBoard({board}));
  }

  createBoard(Board:IBoard){
    let cachedBoard = JSON.parse(localStorage.getItem('boards')!) as IBoard[];
    cachedBoard = [...cachedBoard,Board];
    localStorage.setItem('boards',JSON.stringify(cachedBoard))
    this.store.dispatch(addBoard({board:Board}));
    this.highlightFirstBoard()
  }
  updateSelectedBoard(Id: string, Changes:Partial<IBoard>) {
    this.store.dispatch(updateBoard({id:Id,  changes:Changes}))
  }
  deleteBoard(){
    if (this.selectedBoard.getValue()) {
      let cachedBoard = JSON.parse(localStorage.getItem('boards')!) as IBoard[];
      console.log(cachedBoard)
      cachedBoard = cachedBoard.filter(b=>b.id!== this.selectedBoard.getValue()!.id);
      localStorage.setItem('boards',JSON.stringify(cachedBoard))
      this.store.dispatch(deleteBoard({id:this.selectedBoard.getValue()!.id}))
      this.store.select(selectAllBoards).pipe(
        take(1),
      ).subscribe(boards=>{
        if(boards.length > 0) {
          this.selectBoard(boards[0])
        }
          else this.selectedBoard.next(null)
      })
    }
  }

  highlightFirstBoard(){
    this.store.select(selectAllBoards).pipe(
      take(1),
    ).subscribe(boards=>{
      this.selectBoard(boards[0])
    })
  }

  toggleSidebar(){
    if (window.innerWidth < 768) console.log('moible-sidebar') 
    this.sidebarState ==='opened'
    ? this.sidebarState = 'closed'
    : this.sidebarState = 'opened'; 
  }
}
