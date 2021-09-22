import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, share, shareReplay, take, tap } from 'rxjs/operators';

import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { PaymentsType } from '@app/core/model/PaymentsType';
import { RestockComponent } from './restock/restock.component';
import { StoreActionsService } from '@app/core/services/store-actions/StoreActions.service';
import { StoreConfigService } from '@app/core/services/store-config/StoreConfig.service';
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
    private storeSelectors: StoreSelectorsService,
    private storeConfig: StoreConfigService,
    private modalService: BsModalService
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
      shareReplay()
    );
    this.selectedItem$ = this.storeSelectors
      .getSelectedItemChange()
      .pipe(shareReplay());
  }
  handleCheckout(paymentType: PaymentsType) {
    this.storeActions.handleCheckout(paymentType);
  }
  handleSelection(vendingItem: VendingItem) {
    this.storeActions.updateSelectedItem(vendingItem);
  }
  handleRestock() {
    const initialState = {
      storeState: this.storeSelectors.getState(),
      totalCapacity: this.storeConfig.TOTAL_CAPACITY,
      totalCansAvailable: this.storeSelectors.getTotalNumberOfAvailableCans(),
    };
    const bsModalRef = this.modalService.show(RestockComponent, {
      initialState,
    });
    bsModalRef.content.onRestock.subscribe((data) => {
      this.storeActions.handleRestock(data);
    });
  }
  get isItemSelected(): Observable<boolean> {
    return this.selectedItem$.pipe(map((item) => item !== null));
  }
}
