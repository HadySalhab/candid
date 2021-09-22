import { Flavour } from '@app/core/model/Flavour';
import { VendingItem } from '@app/core/model/VendingItem';
import { VendingStore } from '@app/core/store/VendingStore.service';

export abstract class StoreActionsService {
  constructor(protected store: VendingStore) {}
  protected abstract initializeApp(): void;
  public abstract updateSelectedItem(vendingItem: VendingItem): void;
}
