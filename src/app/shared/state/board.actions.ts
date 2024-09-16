import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { IBoard } from '../models/board';

export const fetchInvoices = createAction('[Invoice API] Fetch Invoices');

export const fetchInvoicesSuccess = createAction(
  '[Invoice API] Fetch Invoices Success',
  props<{ invoices: IBoard[] }>()
);

export const fetchInvoicesFailure = createAction(
  '[Invoice API] Fetch Invoices Failure',
  props<{ error: any }>()
);

export const updateInvoice = createAction(
  '[Invoice] Update Invoice',
  props<{ update: Update<IBoard> }>()
);

export const deleteInvoice = createAction(
  '[Invoice] Delete Invoice',
  props<{ id: string }>()
);

export const addInvoice = createAction(
  '[Invoice] Add Invoice',
  props<{ invoice: IBoard }>()
);

export const setSelectedInvoice = createAction(
  '[Invoice] Set Selected Invoice',
  props<{ invoiceId: string }>()
);

export const clearSelectedInvoice = createAction('[Invoice] Clear Selected Invoice');

export const setTheme = createAction(
  '[Theme] Set Theme',
  props<{ theme: string }>()
);