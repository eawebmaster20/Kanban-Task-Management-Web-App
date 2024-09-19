import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, ReactiveFormsModule, FormControl, Validators, FormsModule } from '@angular/forms';
import { IBoard, IColumn, ITask } from '../../../shared/models/board';
import { v4 as uuidv4 } from 'uuid'
import { Store } from '@ngrx/store';
import { updateBoard } from '../../../shared/state/board.actions';
import { DataService } from '../../../shared/services/data/data.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.sass'
})
export class TaskModalComponent {
  selectedBoard: IBoard = JSON.parse(localStorage.getItem('selectedBoard') || '{}');
  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store, public dataService: DataService,public dialogRef: MatDialogRef<TaskModalComponent>) {
    
    this.taskForm = this.fb.group({
      id: uuidv4(),
      title: ['', Validators.required],
      description: [''],
      columnId: ['', Validators.required],  // Added this to associate task with a column
      subtasks: this.fb.array([])
    });
  }

  ngOnInit(): void {
    // Any additional initialization logic
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

  createTask() {
    console.log(this.taskForm.valid, this.taskForm.value);
    if (this.taskForm.valid) {
      const newTask: ITask = {
        id: uuidv4(),
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        status: this.taskForm.value.status,
        subtasks: this.taskForm.value.subtasks
      };

      const columnId = this.taskForm.value.columnId;
      this.selectedBoard.columns.find(col => col.id === columnId?col.tasks.push(newTask):'');
 
        localStorage.setItem('selectedBoard', JSON.stringify(this.selectedBoard));
        this.dataService.selectedBoard.next(this.selectedBoard)
        this.store.dispatch(updateBoard({id:this.selectedBoard.id ,changes:this.selectedBoard}))
        this.taskForm.reset();
        this.subtasks.clear();
        this.dialogRef.close()
      } else {
        console.error('form ius invalid');
      }
    }
  

  createSubtask(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      isCompleted: [false]
    });
  }
}
