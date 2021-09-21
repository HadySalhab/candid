import { Flavour } from '@app/core/model/Flavour';
import { Injectable } from '@angular/core';
import { StoreState } from '@app/core/model/StoreState';
import { VendingItem } from '@app/core/model/VendingItem';
import initialData from '@app/core/data/initial-data.json';
@Injectable({
  providedIn: 'root',
})
export class StoreConfigService {
  constructor() {}

  get INITIAL_QUANTITY_PER_ITEM(): number {
    return 10;
  }
  get INITIAL_SELECTED_ITEM(): VendingItem | null {
    return null;
  }
  get INITIAL_CANS_SOLD(): number {
    return 0;
  }
  get INITIAL_CASH_AMOUNT(): number {
    return 0;
  }
  get INITIAL_CREDIT_CARD_AMOUNT(): number {
    return 0;
  }
  get INITIAL_FLAVOURS(): Flavour[] {
    return initialData;
  }

  get INITIAL_STATE(): StoreState {
    return {
      selectedItem: this.INITIAL_SELECTED_ITEM,
      totalCansSold: this.INITIAL_CANS_SOLD,
      totalCashAmount: this.INITIAL_CASH_AMOUNT,
      totalCreditCardAmount: this.INITIAL_CREDIT_CARD_AMOUNT,
      vendingItems: this.mapFlavoursToVendingItems(this.INITIAL_FLAVOURS),
    };
  }

  private mapFlavoursToVendingItems(flavours: Flavour[]): VendingItem[] {
    return flavours.map((fl) => ({
      flavour: fl,
      quantity: this.INITIAL_QUANTITY_PER_ITEM,
    }));
  }
}
