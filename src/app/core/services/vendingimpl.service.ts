import { Flavour } from '../model/Flavour';
import { Injectable } from '@angular/core';
import { StoreState } from '../model/StoreState';
import { VendingItem } from '../model/VendingItem';
import { VendingService } from './vending.service';
import { VendingStore } from '../store/VendingStore';
import initialData from '../data/initial-data.json';

@Injectable()
export class VendingImplService extends VendingService {
  private flavours: Flavour[] = initialData;
  private vendingItems: VendingItem[] = this.mapFlavoursToVendingItems();

  private readonly INITIAL_QUANTITY_PER_ITEM = 10;
  private readonly INITIAL_SELECTED_ITEM = null;
  private readonly INITIAL_CANS_SOLD = 0;
  private readonly INITIAL_CASH_AMOUNT = 0;
  private readonly INITIAL_CREDIT_CARD_AMOUNT = 0;
  private readonly INITIAL_STATE: StoreState = {
    selectedItem: this.INITIAL_SELECTED_ITEM,
    totalCansSold: this.INITIAL_CANS_SOLD,
    totalCashAmount: this.INITIAL_CASH_AMOUNT,
    totalCreditCardAmount: this.INITIAL_CREDIT_CARD_AMOUNT,
    vendingItems: this.vendingItems,
  };

  constructor(store: VendingStore) {
    super(store);
    this.initializeApp();
  }
  initializeApp(): void {
    this.store.updateState(this.INITIAL_STATE, VendingActions.INITIALIZE);
  }
  private mapFlavoursToVendingItems() {
    return this.flavours.map(
      (fl) =>
        ({
          flavour: fl,
          quantity: this.INITIAL_QUANTITY_PER_ITEM,
        } as VendingItem)
    );
  }
}

export enum VendingActions {
  INITIALIZE = 'APP_INITIALIZE',
}
