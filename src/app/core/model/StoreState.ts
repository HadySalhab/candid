import { VendingItem } from './VendingItem';

export interface StoreState {
  totalCansSold: number;
  totalCashAmount: number;
  totalCreditCardAmount: number;
  selectedItem: number;
  vendingItems: VendingItem[];
}
