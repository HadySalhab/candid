import { Flavour } from '@app/core/model/Flavour';
import { PaymentsType } from '@app/core/model/PaymentsType';
import { RestockData } from '@app/vending-machine/restock/restock-data.model';
import { VendingItem } from '@app/core/model/VendingItem';
import { VendingStore } from '@app/core/store/VendingStore.service';

export abstract class StoreActionsService {
  constructor(protected store: VendingStore) {}
  protected abstract initializeApp(): void;
  public abstract updateSelectedItem(vendingItem: VendingItem): void;
  public abstract handleCheckout(paymentType: PaymentsType): void;
  public abstract handleRestock(restockData: RestockData): void;
}
