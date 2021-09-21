import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, share, shareReplay, tap } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { StoreState } from '@app/core/model/StoreState';
import { Subscription } from 'rxjs/internal/Subscription';
import { Summary } from './summary-screen/summary.model';
import { VendingItem } from '@app/core/model/VendingItem';
import { VendingService } from '@app/core/services/vending.service';
import { VendingStore } from '@app/core/store/VendingStore';

@Component({
  selector: 'app-vending-machine',
  templateUrl: './vending-machine.component.html',
})
export class VendingMachineComponent implements OnInit {
  summary$: Observable<Summary>;
  vendingItems$: Observable<VendingItem[]>;
  storeState$: Observable<StoreState>;
  constructor(private vs: VendingService, private store: VendingStore) {}

  ngOnInit(): void {
    this.storeState$ = this.store.stateChanged.pipe(shareReplay());
    this.vendingItems$ = this.storeState$.pipe(
      map((state) => {
        console.warn(state);
        return [...state.vendingItems];
      })
    );
    this.summary$ = this.storeState$.pipe(
      map((state) => {
        console.warn(state);
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
