import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, ReactiveFormsModule, FormControl, Validators, FormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid'
import { Store } from '@ngrx/store';
import { updateBoard } from '../../../shared/state/board.actions';
import { DataService } from '../../../shared/services/data/data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { AsyncPipe } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { atLeastOneColumnValidator } from '../../../shared/utils/custom-form-validators/atleast-one-column';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

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

  constructor(private fb: FormBuilder, private store: Store, public dataService: DataService,public dialogRef: MatDialogRef<TaskModalComponent>) {
    
    this.taskForm = this.fb.group({
      id: uuidv4(),
      title: ['', Validators.required],
      description: [''],
      status: ['', Validators.required],
      subtasks: this.fb.array([],atLeastOneColumnValidator())
    });
  }

  ngOnInit(): void {
    this.addSubtask()
  }

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

    if (currentBoard) {
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
      }
      this.taskForm.reset();
      this.dialogRef.close();
    }
  }

  createSubtask(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      isCompleted: [false]
    });
  }
}
