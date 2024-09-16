import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBoard } from '../../models/board';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http:HttpClient
  ) { }
  fetchBoards(): Observable<{boards:IBoard[]}> {
    return this.http.get<{boards:IBoard[]}>('assets/data.json')
  }
}
