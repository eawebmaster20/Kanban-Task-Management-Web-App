import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IBoard } from '../../models/board';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // selectedBoard!: BehaviorSubject<any>
  selectedBoard = new BehaviorSubject<IBoard | null>(null)
  colorList:string[] =[]
  showDropdown = false;
  constructor() { }
}
