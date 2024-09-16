import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InvoiceState, invoiceAdapter } from './board.entity';

export const selectInvoiceState = createFeatureSelector<InvoiceState>('invoices');

const { selectIds, selectEntities, selectAll, selectTotal } = invoiceAdapter.getSelectors(selectInvoiceState);

// export const selectAllInvoicesArray = createSelector(
//   selectInvoiceState,
//   (state: InvoiceState) => state.invoices
// );

export const selectAllInvoices = selectAll;

export const selectInvoiceTotal = selectTotal;

export const selectInvoiceEntities = selectEntities;

export const selectInvoiceIds = selectIds;

export const selectInvoiceById = (invoiceId: string) =>
  createSelector(selectInvoiceEntities, (entities) => entities[invoiceId]);

export const selectSelectedInvoiceId = createSelector(
  selectInvoiceState,
  (state: InvoiceState) => state.selectedInvoiceId
);

export const selectSelectedInvoice = createSelector(
  selectInvoiceEntities,
  selectSelectedInvoiceId,
  (entities, selectedInvoiceId) => selectedInvoiceId ? entities[selectedInvoiceId] : null
);

export const selectTheme = createSelector(
  selectInvoiceState,
  (state: InvoiceState) => state.theme
);