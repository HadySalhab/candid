import { Flavour } from '@app/core/model/Flavour';
import { Injectable } from '@angular/core';
import { StoreActionsService } from './StoreActions.service';
import { StoreState } from '@app/core/model/StoreState';
import { VendingItem } from '@app/core/model/VendingItem';
import { VendingStore } from '@app/core/store/VendingStore';
import initialData from '@app/core/data/initial-data.json';

@Injectable()
export class StoreActionsImplService extends StoreActionsService {
  private readonly INITIAL_QUANTITY_PER_ITEM = 10;
  private readonly INITIAL_SELECTED_ITEM = null;
  private readonly INITIAL_CANS_SOLD = 0;
  private readonly INITIAL_CASH_AMOUNT = 0;
  private readonly INITIAL_CREDIT_CARD_AMOUNT = 0;

  private flavours: Flavour[] = initialData;
  private vendingItems: VendingItem[] = this.mapFlavoursToVendingItems();
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
  private mapFlavoursToVendingItems(): VendingItem[] {
    return this.flavours.map((fl) => ({
      flavour: fl,
      quantity: this.INITIAL_QUANTITY_PER_ITEM,
    }));
  }
}

export enum VendingActions {
  INITIALIZE = 'APP_INITIALIZE',
}
