import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid'
import { atLeastOneColumnValidator } from '../../../shared/utils/custom-form-validators/atleast-one-column';
import { Store } from '@ngrx/store';
import { addBoard } from '../../../shared/state/board.actions';

@Component({
  selector: 'app-create-board',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create-board.component.html',
  styleUrl: './create-board.component.sass'
})
export class CreateBoardComponent {
  boardForm: FormGroup;

  constructor(private fb: FormBuilder, private store:Store) {
    this.boardForm = this.fb.group({
      id:uuidv4(),
      name: ['', Validators.required],
      columns: this.fb.array([],atLeastOneColumnValidator()) 
    });
    const columnForm = this.fb.group({
      id:uuidv4(),
      name: ['', Validators.required], 
      tasks: this.fb.array([]) 
    });
    this.columns.push(columnForm)
  }

  get columns(): FormArray {
    return this.boardForm.get('columns') as FormArray;
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
    console.log(this.boardForm.value);
    console.log(this.boardForm.valid);
    this.store.dispatch(addBoard({board:this.boardForm.value}))
    this.boardForm.reset();
  }
}
