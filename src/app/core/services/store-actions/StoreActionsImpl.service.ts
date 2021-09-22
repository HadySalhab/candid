import { Injectable } from '@angular/core';
import { PaymentsType } from '@app/core/model/PaymentsType';
import { StoreActionsService } from './StoreActions.service';
import { StoreConfigService } from '../store-config/StoreConfig.service';
import { StoreState } from '@app/core/model/StoreState';
import { VendingItem } from '@app/core/model/VendingItem';
import { VendingStore } from '@app/core/store/VendingStore.service';

@Injectable()
export class StoreActionsImplService extends StoreActionsService {
  constructor(store: VendingStore, private storeConfig: StoreConfigService) {
    super(store);
    this.initializeApp();
  }
  initializeApp(): void {
    this.store.updateState(
      this.storeConfig.INITIAL_STATE,
      VendingActions.INITIALIZE
    );
  }
  public updateSelectedItem(vendingItem: VendingItem): void {
    this.store.updateState(
      { selectedItem: vendingItem },
      VendingActions.SELECT_ITEM
    );
  }
  public handleCheckout(paymentType: PaymentsType): void {
    const state = this.store.getCurrentState();
    this.increaseCansSold(state);
    this.decreaseFlavourSold(state);
    this.handlePaymentIncrease(state, paymentType);
    this.resetSelectedItem(state);
    this.store.updateState(state, VendingActions.CHECKOUT);
  }

  private resetSelectedItem(state: StoreState) {
    state.selectedItem = null;
  }
  private increaseCansSold(state: StoreState) {
    state.totalCansSold++;
  }
  private decreaseFlavourSold(state: StoreState) {
    state.vendingItems = state.vendingItems.map((item) => {
      if (item.flavour.name === state.selectedItem.flavour.name) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      } else {
        return item;
      }
    });
  }
  private handlePaymentIncrease(state: StoreState, paymentType: PaymentsType) {
    if (paymentType === PaymentsType.CASH) {
      state.totalCashAmount =
        state.totalCashAmount + state.selectedItem.flavour.price;
    } else {
      state.totalCreditCardAmount =
        state.totalCreditCardAmount + state.selectedItem.flavour.price;
    }
  }
}

export enum VendingActions {
  INITIALIZE = 'APP_INITIALIZE',
  SELECT_ITEM = 'SELECT_ITEM',
  CHECKOUT = 'CHECKOUT',
}
