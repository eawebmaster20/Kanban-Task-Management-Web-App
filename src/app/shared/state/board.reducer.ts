import { createReducer, on } from '@ngrx/store';
import * as InvoiceActions from './board.actions';
import { initialBoardState, invoiceAdapter } from './board.entity';

export const invoiceReducer = createReducer(
  initialBoardState,
  on(InvoiceActions.fetchInvoicesSuccess, (state, { invoices }) =>
    invoiceAdapter.setAll(invoices, state)
  ),
  on(InvoiceActions.addInvoice, (state, { invoice }) =>
    invoiceAdapter.addOne(invoice, state)
  ),
  on(InvoiceActions.deleteInvoice, (state,  { id }) =>
    invoiceAdapter.removeOne(id, state)
  ),
  on(InvoiceActions.updateInvoice, (state, { update }) =>
    invoiceAdapter.updateOne(update, state)
  ),
  on(InvoiceActions.setSelectedInvoice, (state, { invoiceId }) => ({
    ...state,
    selectedInvoiceId: invoiceId,
  })),
  on(InvoiceActions.clearSelectedInvoice, (state) => ({
    ...state,
    selectedInvoiceId: null,
  })),
  on(InvoiceActions.setTheme, (state, { theme }) => ({
    ...state,
    theme,
  }))
);