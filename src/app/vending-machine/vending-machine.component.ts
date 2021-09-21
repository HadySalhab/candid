import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, share } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { StoreActionsService } from '@app/core/services/store-actions/StoreActions.service';
import { StoreState } from '@app/core/model/StoreState';
import { Summary } from './summary-screen/summary.model';
import { VendingStore } from '@app/core/store/VendingStore';

@Component({
  selector: 'app-vending-machine',
  templateUrl: './vending-machine.component.html',
})
export class VendingMachineComponent implements OnInit {
  summary$: Observable<Summary>;
  storeState$: Observable<StoreState>;
  constructor(
    private storeActions: StoreActionsService,
    private store: VendingStore
  ) {}

  ngOnInit(): void {
    this.storeState$ = this.store.stateChanged.pipe(share());
    this.summary$ = this.storeState$.pipe(
      map((state) => {
        return {
          totalCansSold: state.totalCansSold,
          totalCashAmount: state.totalCashAmount,
          totalCreditCardAmount: state.totalCreditCardAmount,
          totalCansAvailable: state.vendingItems
            .map((item) => item.quantity)
            .reduce((prev, curr) => prev + curr),
        };
      })
    );
  }
}
