import { Injectable } from '@angular/core';
import { PaymentsType } from '@app/core/model/PaymentsType';
import { RestockData } from '@app/vending-machine/restock/restock-data.model';
import { StoreActionsService } from './StoreActions.service';
import { StoreConfigService } from '../store-config/StoreConfig.service';
import { StoreState } from '@app/core/model/StoreState';
import { VendingItem } from '@app/core/model/VendingItem';
import { VendingStore } from '@app/core/store/VendingStore.service';

/*
  Service that holds all actions required to update the Store state.
*/
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
    this.increaseNumberOfCansSold(state);
    this.decreaseCanSold(state);
    this.handlePaymentIncrease(state, paymentType);
    this.resetSelectedItem(state);
    this.store.updateState(state, VendingActions.CHECKOUT);
  }
  public handleRestock(restockData: RestockData): void {
    const state = this.store.getCurrentState();
    this.restockCans(state, restockData);
    this.resetTotalCansSold(state);
    this.withdrawMoney(state);
    this.store.updateState(state, VendingActions.RESTOCK);
  }
  private restockCans(state: StoreState, restockData: RestockData) {
    for (let key in restockData) {
      const item = state.vendingItems.find((vi) => vi.flavour.name === key);
      item.quantity += restockData[key];
    }
  }
  private resetTotalCansSold(state: StoreState) {
    state.totalCansSold = 0;
  }
  private withdrawMoney(state: StoreState) {
    state.totalCreditCardAmount = 0;
    state.totalCashAmount = 0;
  }
  private resetSelectedItem(state: StoreState) {
    state.selectedItem = null;
  }
  private increaseNumberOfCansSold(state: StoreState) {
    state.totalCansSold++;
  }
  private decreaseCanSold(state: StoreState) {
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
  RESTOCK = 'RESTOCK',
}
