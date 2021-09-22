import { Injectable } from '@angular/core';
import { StoreActionsService } from './StoreActions.service';
import { StoreConfigService } from '../store-config/StoreConfig.service';
import { VendingItem } from '@app/core/model/VendingItem';
import { VendingStore } from '@app/core/store/VendingStore.service';

@Injectable()
export class StoreActionsImplService extends StoreActionsService {
  constructor(store: VendingStore, private storeConfig: StoreConfigService) {
    super(store);
    this.initializeApp();
  }
  initializeApp(): void {
    this.store.updateState(
      this.storeConfig.INITIAL_STATE,
      VendingActions.INITIALIZE
    );
  }
  public updateSelectedItem(vendingItem: VendingItem): void {
    this.store.updateState(
      { selectedItem: vendingItem },
      VendingActions.SELECT_ITEM
    );
  }
}
export enum VendingActions {
  INITIALIZE = 'APP_INITIALIZE',
  SELECT_ITEM = 'SELECT_ITEM',
}
