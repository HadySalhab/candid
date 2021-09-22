import { Injectable } from '@angular/core';
import { StoreActionsService } from './StoreActions.service';
import { StoreConfigService } from '../store-config/StoreConfig.service';
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
}

export enum VendingActions {
  INITIALIZE = 'APP_INITIALIZE',
}
