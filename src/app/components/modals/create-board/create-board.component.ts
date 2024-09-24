import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid'
import { atLeastOneColumnValidator } from '../../../shared/utils/custom-form-validators/atleast-one-column';
import { Store } from '@ngrx/store';
import { DataService } from '../../../shared/services/data/data.service';

@Component({
  selector: 'app-create-board',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create-board.component.html',
  styleUrl: './create-board.component.sass'
})
export class CreateBoardComponent {
  boardForm: FormGroup;
  data = inject(MAT_DIALOG_DATA);
  edit = false;
  constructor(
  public dataService: DataService,
    private fb: FormBuilder, 
    private store:Store, 
    public dialogRef: MatDialogRef<CreateBoardComponent>
  ) {
    this.boardForm = this.fb.group({
      id:uuidv4(),
      name: [{value:'',disabled: this.shouldDisableNameField()}, Validators.required],
      columns: this.fb.array([],atLeastOneColumnValidator()) 
    });
    const columnForm = this.fb.group({
      id:uuidv4(),
      name: ['', Validators.required], 
      tasks: this.fb.array([]) 
    });
    this.data?.name?.length ? (this.populateForm(this.data), this.edit=true):this.columns.push(columnForm)
  }

  get columns(): FormArray {
    return this.boardForm.get('columns') as FormArray;
  }
  getTasks(columnIndex: number): FormArray {
    return (this.columns.at(columnIndex).get('tasks') as FormArray);
  }

  addColumn(): void {
    const columnForm = this.fb.group({
      name: [''], 
      tasks: this.fb.array([]) 
    });
    this.columns.push(columnForm);
  }


  removeColumn(index: number): void {
    this.columns.removeAt(index);
  }

 
  onSubmit(): void {
    if (this.boardForm.valid) {
      this.dialogRef.close({data:this.boardForm.value, update:this.edit});
      this.boardForm.reset();
    }
  }
  shouldDisableNameField(): boolean {
    return !!this.data?.name?.length;
  }
  populateForm(data: any) {
    
    this.boardForm.patchValue({
      id: data.id || uuidv4(),
      name: data.name || ''
    });

    data.columns.forEach((column: any) => {
      const columnForm = this.fb.group({
        id: [column.id || uuidv4()],
        name: [column.name || '', Validators.required],
        tasks: this.fb.array([])
      });

      column.tasks.forEach((task: any) => {
        const taskForm = this.fb.group({
          title: [task.title || '', Validators.required],
          description: [task.description || ''],
          status: [task.status || ''],
          subtasks: this.fb.array([]) 
        });

        task.subtasks.forEach((subtask: any) => {
          const subtaskForm = this.fb.group({
            title: [subtask.title || '', Validators.required],
            isCompleted: [subtask.isCompleted || false]
          });
          (taskForm.get('subtasks') as FormArray).push(subtaskForm);
        });

        (columnForm.get('tasks') as FormArray).push(taskForm);
      });

      this.columns.push(columnForm);
    });
  }
}
