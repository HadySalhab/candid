import { Observable } from 'rxjs/internal/Observable';
import { ObservableStore } from '@codewithdan/observable-store';
import { StoreState } from '../model/StoreState';

export abstract class VendingStore extends ObservableStore<StoreState> {
  constructor() {
    super({ trackStateHistory: true, logStateChanges: true });
  }
  abstract updateState(newState: Partial<StoreState>, action: string): void;
  abstract getStateChange(): Observable<StoreState>;
  abstract getCurrentState(): StoreState;
}
