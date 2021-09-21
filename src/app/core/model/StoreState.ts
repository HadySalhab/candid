import { VendingItem } from './VendingItem';

export interface StoreState {
  totalCansSold: number;
  totalCashAmount: number;
  totalCreditCardAmount: number;
  selectedItem: VendingItem | null;
  vendingItems: VendingItem[];
}
