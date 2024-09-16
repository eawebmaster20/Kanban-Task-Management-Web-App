import { createReducer, on } from '@ngrx/store';
import * as BoardActions from './board.actions';
import { initialBoardState, boardAdaptor } from './board.entity';

export const boardReducer = createReducer(
  initialBoardState,
  on(BoardActions.fetchBoardsSuccess, (state, { boards }) => boardAdaptor.setAll(boards, state)),
  on(BoardActions.addBoard, (state, { board }) => boardAdaptor.addOne(board, state)),
  on(BoardActions.updateBoard, (state, { board }) => boardAdaptor.updateOne({ id: board.id, changes: board }, state)),
  on(BoardActions.deleteBoard, (state, { id }) => boardAdaptor.removeOne(id, state))
);

export const { selectAll, selectEntities } = boardAdaptor.getSelectors();

