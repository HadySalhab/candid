import { Observable, of } from 'rxjs';

import { StoreConfigService } from '../store-config/StoreConfig.service';
import { StoreSelectorsImplService } from './StoreSelectorsImpl.service';
import { StoreSelectorsService } from './StoreSelectors.service';
import { StoreState } from '@app/core/model/StoreState';
import { TestBed } from '@angular/core/testing';
import { VendingItem } from '@app/core/model/VendingItem';
import { VendingStore } from '@app/core/store/VendingStore.service';

describe('StoreSelectorsImplService', () => {
  let SUT: StoreSelectorsService;
  let vendingStoreMock: VendingStoreMock;
  const selectedItem: VendingItem = {
    flavour: {
      price: 1.0,
      name: 'test',
    },
    quantity: 10,
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: StoreConfigService,
        },
        {
          provide: VendingStore,
          useClass: VendingStoreMock,
        },
        {
          provide: StoreSelectorsService,
          useClass: StoreSelectorsImplService,
        },
      ],
    });
    SUT = TestBed.get(StoreSelectorsService);
    vendingStoreMock = TestBed.get(VendingStore);
  });
  it('should create', () => {
    expect(SUT).toBeTruthy();
  });
  describe('getState()', () => {
    it('should get current store state', () => {
      const state = SUT.getState();
      expect(state).toEqual(vendingStoreMock.state);
    });
  });
  describe('getFullStateChange()', () => {
    it('should return full state observable', async () => {
      SUT.getFullStateChange().subscribe((state) => {
        expect(state).toEqual(vendingStoreMock.state);
      });
    });
  });
  describe('getSelectedItemChange()', () => {
    it('should return store selected item observable', async () => {
      vendingStoreMock.state.selectedItem = selectedItem;
      SUT.getSelectedItemChange().subscribe((storeSelectedItem) => {
        expect(storeSelectedItem).toEqual(vendingStoreMock.state.selectedItem);
      });
    });
  });
  describe('getTotalNumberOfAvailableCans()', () => {
    it('should return current total number of cans', () => {
      vendingStoreMock.state.vendingItems = [
        selectedItem,
        { flavour: { name: 'test2', price: 2 }, quantity: 20 },
      ];
      const total = SUT.getTotalNumberOfAvailableCans();
      expect(total).toEqual(
        vendingStoreMock.state.vendingItems
          .map((vi) => vi.quantity)
          .reduce((prev, curr) => prev + curr)
      );
    });
  });
  describe('getVendingItemsChange()', () => {
    it('should return store vending items observable', async () => {
      vendingStoreMock.state.vendingItems = [
        selectedItem,
        { flavour: { name: 'test2', price: 2 }, quantity: 20 },
      ];
      SUT.getVendingItemsChange().subscribe((vendingItems) => {
        expect(vendingItems).toEqual(vendingStoreMock.state.vendingItems);
      });
    });
  });
});

//</--------------------------------------------->
// Helper Class ----------------------------------------------------------------------------------
class VendingStoreMock extends VendingStore {
  public updateStateCount: number = 0;
  public state: StoreState = {
    selectedItem: null,
    totalCansSold: 0,
    totalCashAmount: 0,
    totalCreditCardAmount: 0,
    vendingItems: [],
  } as StoreState;
  public action: string;
  updateState(newState: Partial<StoreState>, action: string): void {
    this.updateStateCount++;
    this.state = {
      ...this.state,
      ...newState,
    };
    this.action = action;
  }
  getStateChange(): Observable<StoreState> {
    return of(this.state);
  }
  getCurrentState(): StoreState {
    return this.state;
  }
}
