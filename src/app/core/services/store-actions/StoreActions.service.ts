import { VendingStore } from '@app/core/store/VendingStore.service';

export abstract class StoreActionsService {
  constructor(protected store: VendingStore) {}
  protected abstract initializeApp(): void;
}
