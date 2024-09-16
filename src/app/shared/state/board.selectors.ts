import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardState, adapter } from './board.entity';

export const selectBoardState = createFeatureSelector<BoardState>('boards');

export const {
  selectIds: selectBoardIds,
  selectEntities: selectBoardEntities,
  selectAll: selectAllBoards,
  selectTotal: selectBoardTotal,
} = adapter.getSelectors(selectBoardState);

export const selectSelectedBoardId = createSelector(
  selectBoardState,
  (state: BoardState) => state.selectedBoardId
);

export const selectSelectedBoard = createSelector(
  selectBoardEntities,
  selectSelectedBoardId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
