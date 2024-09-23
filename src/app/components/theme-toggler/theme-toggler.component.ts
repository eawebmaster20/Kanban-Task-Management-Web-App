import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data/data.service';

@Component({
  selector: 'app-theme-toggler',
  standalone: true,
  imports: [],
  templateUrl: './theme-toggler.component.html',
  styleUrl: './theme-toggler.component.sass'
})
export class ThemeTogglerComponent implements OnInit {
  // checked: boolean  = true
  constructor(public dataService:DataService){}
  toggleTheme(){
    this.dataService.checked = !this.dataService.checked;
    localStorage.setItem('theme', JSON.stringify(this.dataService.checked))
  }

  ngOnInit(){
    this.dataService.checked = JSON.parse(localStorage.getItem('theme') || 'true');
  }
}
