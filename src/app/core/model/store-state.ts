import { VendingItem } from './vending-item.model';

export interface StoreState {
  totalCansSold: number;
  totalCashAmount: number;
  totalCreditCardAmount: number;
  selectedItem: number;
  vendingItems: VendingItem[];
}
