import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IBoard } from '../models/board';

export interface BoardState extends EntityState<IBoard> {
}

export const invoiceAdapter: EntityAdapter<IBoard> = createEntityAdapter<IBoard>();

export const initialBoardState: BoardState = invoiceAdapter.getInitialState({

});