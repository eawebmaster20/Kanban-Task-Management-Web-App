import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import * as InvoiceActions from './board.actions';
import { Invoice } from '../models/board';
import { ApiService } from '../services/api/api.service';


@Injectable()
export class InvoiceEffects {

  constructor(
    private actions: Actions,
    private storeService: ApiService,
  ) {}

  fetchInvoices$ = createEffect(() =>
    this.actions.pipe(
      ofType(InvoiceActions.fetchInvoices),
      mergeMap(() => {
        const localStorageInvoices = localStorage.getItem('invoices');

        if (localStorageInvoices) {
          const invoices: Invoice[] = JSON.parse(localStorageInvoices);
          return of(InvoiceActions.fetchInvoicesSuccess({ invoices }));
        } else {
          return this.storeService.fetchInvoices().pipe(
            tap((invoices: Invoice[]) => {
              localStorage.setItem('invoices', JSON.stringify(invoices));
            }),
            map((invoices: Invoice[]) =>
            {
              localStorage.setItem('invoices', JSON.stringify(invoices));
              return InvoiceActions.fetchInvoicesSuccess({ invoices })
            }
            ),
            catchError((error) =>
              of(InvoiceActions.fetchInvoicesFailure({ error }))
            )
          );
        }
      })
    )
  );
}