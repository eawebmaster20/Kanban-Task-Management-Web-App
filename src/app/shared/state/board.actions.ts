
import { createAction, props } from '@ngrx/store';
import { IBoard } from '../models/board';

export const fetchBoardsSuccess = createAction('[Board/API] Load Boards', props<{ boards: IBoard[] }>());
export const fetchBoardsFailure = createAction('[Board/API] Load failed');
export const addBoard = createAction('[Board/API] Add Board', props<{ board: IBoard }>());
export const updateBoard = createAction('[Board/API] Update Board', props<{ board: IBoard }>());
export const deleteBoard = createAction('[Board/API] Delete Board', props<{ id: string }>());
export const fetchBoards = createAction('[Invoice API] Fetch boards');
