import { Component, OnInit } from '@angular/core';
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
import { take } from 'rxjs';

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
export class AppComponent implements OnInit {
  title = 'kanbanTaskManagement';
  // boards = ['Platform Launch', 'Marketing Plan', 'Roadmap']
  board:IBoard = {id:uuidv4(),name:'test board name',columns:[]}
  checked: boolean  = true
  allStoreBoards = selectAllBoards
  selectedBoard = selectSelectedBoard
  constructor(
    public store:Store,
    public dialog: MatDialog,
    public dataService:DataService
  ) {
      this.store.dispatch(fetchBoards());
  }
  
  ngOnInit(){
    this.store.select(this.allStoreBoards).pipe(
      take(1),
    ).subscribe(boards=>{
      this.dataService.selectBoard(boards[0])
    })
  }
  toggleTheme(){
    this.checked = !this.checked;
    console.log('theme toggled to :', this.checked);
  }




  openDialog() {
    console.log('dialog open')
    const dialogRef = this.dialog.open(CreateBoardComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
