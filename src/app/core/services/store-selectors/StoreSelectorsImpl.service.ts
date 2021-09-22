import { map, take } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreSelectorsService } from './StoreSelectors.service';
import { StoreState } from '@app/core/model/StoreState';
import { VendingItem } from '@app/core/model/VendingItem';
import { VendingStore } from '@app/core/store/VendingStore.service';

@Injectable()
export class StoreSelectorsImplService extends StoreSelectorsService {
  constructor(store: VendingStore) {
    super(store);
  }
  getTotalNumberOfAvailableCans(): number {
    return this.store
      .getCurrentState()
      .vendingItems.map((v) => v.quantity)
      .reduce((prev, curr) => prev + curr);
  }
  getFullStateChange(): Observable<StoreState> {
    return this.store.getStateChange();
  }
  getVendingItemsChange(): Observable<VendingItem[]> {
    return this.store.getStateChange().pipe(
      map((state) => {
        return state.vendingItems;
      })
    );
  }
}
