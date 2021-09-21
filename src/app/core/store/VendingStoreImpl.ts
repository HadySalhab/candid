import { StoreState } from '../model/store-state';
import { VendingStore } from './VendingStore';

export class VendingStoreImpl extends VendingStore {
  getMessage(): string {
    return 'hello';
  }
  updateState(newState: StoreState): void {
    this.setState(newState);
  }
}
