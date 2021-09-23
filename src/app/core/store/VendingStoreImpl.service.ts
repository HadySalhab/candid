import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreState } from '../model/StoreState';
import { VendingStore } from './VendingStore.service';

/*
  The store of the application that holds the state of the vending machine
*/
@Injectable()
export class VendingStoreImpl extends VendingStore {
  getStateChange(): Observable<StoreState> {
    return this.stateChanged;
  }
  getCurrentState(): StoreState {
    return this.getState();
  }
  updateState(newState: Partial<StoreState>, action: string): void {
    this.setState(newState, action);
    console.log(this.stateHistory);
  }
}
