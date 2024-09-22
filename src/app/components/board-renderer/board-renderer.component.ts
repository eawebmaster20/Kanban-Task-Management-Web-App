import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { AsyncPipe } from '@angular/common';
import { IBoard, ITask } from '../../shared/models/board';
import { Store } from '@ngrx/store';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../../shared/services/data/data.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskDetailsModalComponent } from '../modals/task-details-modal/task-details-modal.component';

@Component({
  selector: 'app-board-renderer',
  standalone: true,
  imports: [CdkDropListGroup, CdkDropList, CdkDrag, AsyncPipe, MatIconModule],
  templateUrl: './board-renderer.component.html',
  styleUrl: './board-renderer.component.sass'
})
export class BoardRendererComponent implements OnInit {
  // controlBoard!: IBoard 
  constructor(public store:Store, public dataService:DataService,public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openTaskDetailsDialog(task:ITask){
    this.dialog.open(TaskDetailsModalComponent,{
      width:"480px",
      data:task
    })
  }
  dropStore(event: CdkDragDrop<ITask[]>) {
    let tempBoard = this.dataService.selectedBoard.getValue();
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.dataService.deleteBoard()
      this.dataService.createBoard(tempBoard!)
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.dataService.deleteBoard()
      this.dataService.createBoard(tempBoard!)
    }
  }

  countCompleted(task:ITask):Number {
    return task.subtasks.filter(subtask => subtask.isCompleted).length;
  }

   
}
