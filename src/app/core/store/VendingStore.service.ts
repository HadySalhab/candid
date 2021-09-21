import { ObservableStore } from '@codewithdan/observable-store';
import { StoreState } from '../model/StoreState';

export abstract class VendingStore extends ObservableStore<StoreState> {
  constructor() {
    super({ trackStateHistory: true, logStateChanges: true });
  }
  abstract updateState(newState: StoreState, action: string): void;
}
