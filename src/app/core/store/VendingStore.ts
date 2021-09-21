import { ObservableStore } from '@codewithdan/observable-store';
import { StoreState } from '../model/StoreState';

export abstract class VendingStore extends ObservableStore<StoreState> {
  abstract updateState(newState: StoreState): void;
  abstract getMessage(): string;
}