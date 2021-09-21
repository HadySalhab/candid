import { VendingStore } from '@app/core/store/VendingStore.service';

export abstract class StoreSelectorsService {
  constructor(protected store: VendingStore) {}
}
