import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialog } from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { ITask } from '../../../shared/models/board';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { DataService } from '../../../shared/services/data/data.service';
import { AsyncPipe } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import { TaskModalComponent } from '../task-modal/task-modal.component';

@Component({
  selector: 'app-task-details-modal',
  standalone: true,
  imports: [ MatDialogTitle, MatDialogContent,MatIconModule,MatCheckboxModule, FormsModule,MatSelectModule, MatMenuModule, AsyncPipe],
  templateUrl: './task-details-modal.component.html',
  styleUrl: './task-details-modal.component.sass'
})
export class TaskDetailsModalComponent {
  data = inject(MAT_DIALOG_DATA);
  statusList:string[]=[]
  constructor(public dataService: DataService, public dialog: MatDialog){
    console.log(this.data);
    this.dataService.selectedBoard.getValue()?.columns.forEach(column =>this.statusList.push(column.name))
  }

  countCompleted(task:ITask):Number {
    return task.subtasks.filter(subtask => subtask.isCompleted).length;
  }

  openTaskDialog(task?:ITask) {
    console.log('dialog open')
    const dialogRef = this.dialog.open(TaskModalComponent,{
      data:task
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  logger(){
    console.log(this.data)
  }
}
