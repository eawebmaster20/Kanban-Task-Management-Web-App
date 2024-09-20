import { Component, inject } from '@angular/core';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { ITask } from '../../../shared/models/board';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { DataService } from '../../../shared/services/data/data.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-task-details-modal',
  standalone: true,
  imports: [ MatDialogTitle, MatDialogContent,MatIconModule,MatCheckboxModule, FormsModule,MatSelectModule, AsyncPipe],
  templateUrl: './task-details-modal.component.html',
  styleUrl: './task-details-modal.component.sass'
})
export class TaskDetailsModalComponent {
  data = inject(MAT_DIALOG_DATA);
  statusList:string[]=[]
  constructor(public dataService: DataService){
    console.log(this.data);
    this.dataService.selectedBoard.getValue()?.columns.forEach(column =>this.statusList.push(column.name))
  }

  countCompleted(task:ITask):Number {
    return task.subtasks.filter(subtask => subtask.isCompleted).length;
  }

  logger(){
    console.log(this.data)
  }
}
