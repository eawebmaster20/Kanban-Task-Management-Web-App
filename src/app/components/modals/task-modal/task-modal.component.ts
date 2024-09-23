import { Component, inject, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, ReactiveFormsModule, FormControl, Validators, FormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid'
import { Store } from '@ngrx/store';
import { updateBoard } from '../../../shared/state/board.actions';
import { DataService } from '../../../shared/services/data/data.service';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AsyncPipe } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { atLeastOneColumnValidator } from '../../../shared/utils/custom-form-validators/atleast-one-column';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ITask } from '../../../shared/models/board';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [ReactiveFormsModule, FormsModule, AsyncPipe,MatSelectModule, MatFormFieldModule, MatInputModule,],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.sass'
})
export class TaskModalComponent {
  taskForm: FormGroup;
  edit = false;
  formValid: boolean = true;
  data = inject(MAT_DIALOG_DATA);
  constructor(private fb: FormBuilder, private store: Store, public dataService: DataService,public dialogRef: MatDialogRef<TaskModalComponent>) {
    console.log(this.data)
    this.taskForm = this.fb.group({
      id: uuidv4(),
      title: ['', Validators.required],
      description: [''],
      status: ['', Validators.required],
      subtasks: this.fb.array([],atLeastOneColumnValidator())
    });
    this.data?.title?.length ? (this.populateTaskForm(this.data), this.edit=true, console.log('if')):this.addSubtask()
  }

  // ngOnInit(): void {
  //   this.addSubtask()
  // }

  get subtasks(): FormArray {
    return this.taskForm.get('subtasks') as FormArray;
  }

  addSubtask(): void {
    this.subtasks.push(this.createSubtask());
  }

  removeSubtask(index: number): void {
    this.subtasks.removeAt(index);
  }
  createTask(){
    const currentBoard = this.dataService.selectedBoard.getValue();
    this.formValid = this.taskForm.valid
    if (currentBoard && this.taskForm.valid) {
      const selectedColumnIndex = currentBoard.columns.findIndex(c => c.id === this.taskForm.value.status);
    
      if (selectedColumnIndex > -1) {
        const newTask = {
          id: uuidv4(),
          title: this.taskForm.value.title,
          description: this.taskForm.value.description,
          status: this.taskForm.value.status,
          subtasks: this.taskForm.value.subtasks
        };
    
        const updatedColumns = [...currentBoard.columns];
        updatedColumns[selectedColumnIndex] = {
          ...updatedColumns[selectedColumnIndex],
          tasks: [...updatedColumns[selectedColumnIndex].tasks, newTask]
        };
        this.dataService.selectedBoard.next({
          ...currentBoard,
          columns: updatedColumns
        });
        this.taskForm.reset();
        this.dialogRef.close(true);
      }
      else{
        this.taskForm.reset();
        this.dialogRef.close();
      }
    }
  }

  createSubtask(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      isCompleted: [false]
    });
  }


  populateTaskForm(taskData: any) {
    this.taskForm.patchValue({
      id: uuidv4(), // Generate new id for this task
      title: taskData.title || '',
      description: taskData.description || '',
      status: taskData.status || ''
    });

    taskData.subtasks.forEach((subtask: any) => {
      const subtaskForm = this.fb.group({
        title: [subtask.title || '', Validators.required],
        isCompleted: [subtask.isCompleted || false]
      });
      this.subtasks.push(subtaskForm);
    });
  }
}
