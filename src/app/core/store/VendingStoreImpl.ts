import { Injectable } from '@angular/core';
import { StoreState } from '../model/StoreState';
import { VendingStore } from './VendingStore';

@Injectable()
export class VendingStoreImpl extends VendingStore {
  updateState(newState: StoreState, action: string): void {
    this.setState(newState, action);
    console.log(this.stateHistory);
  }
}
