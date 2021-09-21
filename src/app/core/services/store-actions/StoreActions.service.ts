import { VendingStore } from '@app/core/store/VendingStore';

export abstract class StoreActionsService {
  constructor(protected store: VendingStore) {}
  protected abstract initializeApp(): void;
}
