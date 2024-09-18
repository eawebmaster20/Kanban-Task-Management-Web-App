import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as BoardActions from './board.actions';
import { IBoard } from '../models/board';
import { ApiService } from '../services/api/api.service';
import { v4 as uuidv4 } from 'uuid'
;
@Injectable()
export class BoardEffects {

  constructor(
    private actions: Actions,
    private storeService: ApiService,
  ) {}

  fetchBoards$ = createEffect(() =>
    this.actions.pipe(
      ofType(BoardActions.fetchBoards),
      mergeMap(() => {
        const localStorageBoards = localStorage.getItem('boards');

        if (localStorageBoards) {
          const boards: IBoard[] = JSON.parse(localStorageBoards);
          console.log('data exist in localStorage');
          return of(BoardActions.fetchBoardsSuccess({boards}));
        } else {
          return this.storeService.fetchBoards().pipe(
            map(res => res.boards.map((board) => ({
              ...board,
              id: uuidv4(),
              columns: board.columns.map(column => ({
                ...column,
                id: uuidv4()
              }))
            }))), 
            tap((boards: IBoard[]) => {
              console.log('loading from api')
              localStorage.setItem('boards', JSON.stringify(boards));
            }),
            map((boards: IBoard[]) => 
              BoardActions.fetchBoardsSuccess({ boards })
            ),
            catchError((error) =>
              of(BoardActions.fetchBoardsFailure())
            )
          );
        }
      })
    )
  );
}
