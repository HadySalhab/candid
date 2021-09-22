import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, share, shareReplay, take, tap } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { StoreActionsService } from '@app/core/services/store-actions/StoreActions.service';
import { StoreSelectorsService } from '@app/core/services/store-selectors/StoreSelectors.service';
import { StoreState } from '@app/core/model/StoreState';
import { Summary } from './summary-screen/summary.model';
import { VendingItem } from '@app/core/model/VendingItem';

@Component({
  selector: 'app-vending-machine',
  templateUrl: './vending-machine.component.html',
})
export class VendingMachineComponent implements OnInit {
  summary$: Observable<Summary>;
  vendingItems$: Observable<VendingItem[]>;
  selectedItem$: Observable<VendingItem>;
  constructor(
    private storeActions: StoreActionsService,
    private storeSelectors: StoreSelectorsService
  ) {}

  ngOnInit(): void {
    this.vendingItems$ = this.storeSelectors
      .getVendingItemsChange()
      .pipe(share());
    this.summary$ = this.storeSelectors.getFullStateChange().pipe(
      map((state) => {
        return {
          totalCansSold: state.totalCansSold,
          totalCashAmount: state.totalCashAmount,
          totalCreditCardAmount: state.totalCreditCardAmount,
          totalCansAvailable:
            this.storeSelectors.getTotalNumberOfAvailableCans(),
        };
      }),
      share()
    );
    this.selectedItem$ = this.storeSelectors
      .getSelectedItemChange()
      .pipe(share());
  }

  handleSelection(vendingItem: VendingItem) {
    this.storeActions.updateSelectedItem(vendingItem);
  }
}
