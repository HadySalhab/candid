import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreState } from '../model/StoreState';
import { VendingStore } from './VendingStore.service';

@Injectable()
export class VendingStoreImpl extends VendingStore {
  getStateChange(): Observable<StoreState> {
    return this.stateChanged;
  }
  updateState(newState: StoreState, action: string): void {
    this.setState(newState, action);
    console.log(this.stateHistory);
  }
}
