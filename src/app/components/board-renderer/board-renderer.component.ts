import { Component } from '@angular/core';
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
import { selectSelectedBoard } from '../../shared/state/board.selectors';
import { getRandomColor } from '../../shared/utils/colorGenerator';
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
export class BoardRendererComponent {
  // selectedBoard!: IBoard | null
  controlBoard!: IBoard 
  // colorList:string[] =[]
  constructor(public store:Store, public dataService:DataService,public dialog: MatDialog) { }

  openTaskDetailsDialog(task:ITask){
    this.dialog.open(TaskDetailsModalComponent,{
      width:"480px",
      data:task
    })
  }
  dropStore(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  countCompleted(task:ITask):Number {
    return task.subtasks.filter(subtask => subtask.isCompleted).length;
  }

   
}
