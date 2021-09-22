import { Observable } from 'rxjs';
import { StoreState } from '@app/core/model/StoreState';
import { VendingItem } from '@app/core/model/VendingItem';
import { VendingStore } from '@app/core/store/VendingStore.service';

export abstract class StoreSelectorsService {
  constructor(protected store: VendingStore) {}
  abstract getVendingItemsChange(): Observable<VendingItem[]>;
  abstract getFullStateChange(): Observable<StoreState>;
  abstract getTotalNumberOfAvailableCans(): number;
  abstract getSelectedItemChange(): Observable<VendingItem>;
}
