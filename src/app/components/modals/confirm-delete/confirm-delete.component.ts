import { Component, inject } from '@angular/core';
import { 
  MAT_DIALOG_DATA, 
  MatDialogRef, 
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DataService } from '../../../shared/services/data/data.service';

@Component({
  selector: 'app-confirm-delete',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose],
  templateUrl: './confirm-delete.component.html',
  styleUrl: './confirm-delete.component.sass'
})
export class ConfirmDeleteComponent {
  data = inject(MAT_DIALOG_DATA);
  constructor(private dataService:DataService, public dialogRef: MatDialogRef<ConfirmDeleteComponent>) { }

  deleteBoard(){
    this.dataService.deleteBoard()
    this.dialogRef.close();
  }
}
