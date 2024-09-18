import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, boardAdaptor } from './board.entity';

export const selectBoardState = createFeatureSelector<State>('boards');

export const {
  selectIds: selectBoardIds,
  selectEntities: selectBoardEntities,
  selectAll: selectAllBoards,
  selectTotal: selectBoardTotal,
} = boardAdaptor.getSelectors(selectBoardState);

export const selectSelectedBoardId = createSelector(
  selectBoardState,
  (state: State) => state.ids
);

export const selectSelectedBoard = createSelector(
  selectBoardState,
  (state: State) => state.selectedBoard
);

