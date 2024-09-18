import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-create-board',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './create-board.component.html',
  styleUrl: './create-board.component.sass'
})
export class CreateBoardComponent {

}
