
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IBoard } from '../models/board';

export interface State extends EntityState<IBoard> {
}

export const boardAdaptor: EntityAdapter<IBoard> = createEntityAdapter<IBoard>({
    selectId: (board: IBoard) => board.id,
    sortComparer: (a: IBoard, b: IBoard) => a.name.localeCompare(b.name),
});

export const initialBoardState: State = boardAdaptor.getInitialState();