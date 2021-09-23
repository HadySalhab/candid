import { Observable, of } from 'rxjs';

import { PaymentsType } from '@app/core/model/PaymentsType';
import { RestockData } from '@app/vending-machine/restock/restock-data.model';
import { StoreActionsImplService } from './StoreActionsImpl.service';
import { StoreActionsService } from './StoreActions.service';
import { StoreConfigService } from '../store-config/StoreConfig.service';
import { StoreState } from '@app/core/model/StoreState';
import { TestBed } from '@angular/core/testing';
import { VendingActions } from './StoreActionsImpl.service';
import { VendingItem } from '@app/core/model/VendingItem';
import { VendingStore } from '@app/core/store/VendingStore.service';
import { sample } from 'rxjs/operators';

describe('StoreActionsServiceImpl', () => {
  let SUT: StoreActionsService;
  let vendingStoreMock: VendingStoreMock;
  let storeConfig: StoreConfigService;
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
          provide: StoreActionsService,
          useClass: StoreActionsImplService,
        },
      ],
    });
    SUT = TestBed.get(StoreActionsService);
    vendingStoreMock = TestBed.get(VendingStore);
    storeConfig = TestBed.get(StoreConfigService);
  });
  it('should create', () => {
    expect(SUT).toBeTruthy();
  });
  describe('constructor()', () => {
    it('should initialize application', () => {
      expect(vendingStoreMock.updateStateCount).toEqual(1);
      expect(vendingStoreMock.action).toEqual(VendingActions.INITIALIZE);
      expect(vendingStoreMock.state).toEqual(storeConfig.INITIAL_STATE);
    });
  });
  describe('updateSelectedItem()', () => {
    it('should pass selectedItem to store', () => {
      SUT.updateSelectedItem(selectedItem);
      expect(vendingStoreMock.state.selectedItem).toEqual(selectedItem);
      expect(vendingStoreMock.action).toEqual(VendingActions.SELECT_ITEM);
    });
  });
  describe('handleCheckout(any)', () => {
    it('should decrease quantity of the purchased can by 1', () => {
      // arrange
      fillStoreWithValues();
      const quantityBefore = vendingStoreMock.state.selectedItem.quantity;
      // act
      SUT.handleCheckout(PaymentsType.CASH);
      // assert
      const quantityAfter = vendingStoreMock.state.vendingItems.find(
        (vi) => vi.flavour.name === selectedItem.flavour.name
      ).quantity;
      expect(quantityAfter).toEqual(quantityBefore - 1);
    });
    it('should increase cans sold by 1', () => {
      // arrange
      fillStoreWithValues();
      const soldBefore = vendingStoreMock.state.totalCansSold;
      // act
      SUT.handleCheckout(PaymentsType.CASH);
      // assert
      expect(vendingStoreMock.state.totalCansSold).toEqual(soldBefore + 1);
    });
    it('should set selectedItem to null', () => {
      fillStoreWithValues();
      // act
      SUT.handleCheckout(PaymentsType.CASH);
      // assert
      expect(vendingStoreMock.state.selectedItem).toBe(null);
    });
  });
  describe('handleCheckout("cash")', () => {
    it('should add can price to the cash amount', () => {
      // arrange
      fillStoreWithValues();
      const cashBefore = vendingStoreMock.state.totalCashAmount;
      // act
      SUT.handleCheckout(PaymentsType.CASH);
      // assert
      expect(vendingStoreMock.state.totalCashAmount).toEqual(
        cashBefore + selectedItem.flavour.price
      );
    });
  });
  describe('handleCheckout("credit card")', () => {
    it('should add can price to the credit card amount', () => {
      // arrange
      fillStoreWithValues();
      const creditBefore = vendingStoreMock.state.totalCreditCardAmount;
      // act
      SUT.handleCheckout(PaymentsType.CREDIT_CARD);
      // assert
      expect(vendingStoreMock.state.totalCreditCardAmount).toEqual(
        creditBefore + selectedItem.flavour.price
      );
    });
  });

  describe('restock()', () => {
    it('should reset cash held in the machine to zero', () => {
      // arrange
      fillStoreWithValues();
      vendingStoreMock.state.totalCashAmount = 10;
      const sampleRestockData = getRestockData();
      // act
      SUT.handleRestock(sampleRestockData);
      // assert
      expect(vendingStoreMock.state.totalCashAmount).toEqual(0);
    });
    it('should reset credit held in the machine to zero', () => {
      // arrange
      fillStoreWithValues();
      vendingStoreMock.state.totalCreditCardAmount = 10;
      const sampleRestockData = getRestockData();
      // act
      SUT.handleRestock(sampleRestockData);
      // assert
      expect(vendingStoreMock.state.totalCreditCardAmount).toEqual(0);
    });
    it('should reset number of cans sold to zero', () => {
      // arrange
      fillStoreWithValues();
      vendingStoreMock.state.totalCansSold = 10;
      const sampleRestockData = getRestockData();
      // act
      SUT.handleRestock(sampleRestockData);
      // assert
      expect(vendingStoreMock.state.totalCansSold).toEqual(0);
    });
    it('should add amount of new cans to the available cans', () => {
      // arrange
      fillStoreWithValues();
      const totalBefore = vendingStoreMock.state.vendingItems
        .map((vi) => vi.quantity)
        .reduce((prev, curr) => prev + curr);
      const sampleRestockData = getRestockData();
      // act
      SUT.handleRestock(sampleRestockData);
      // assert
      const totalRestocked = Object.values(sampleRestockData).reduce(
        (prev, curr) => prev + curr
      );
      const totalAfter = vendingStoreMock.state.vendingItems
        .map((vi) => vi.quantity)
        .reduce((prev, curr) => prev + curr);
      expect(totalAfter).toEqual(totalBefore + totalRestocked);
    });
  });

  function getRestockData(): RestockData {
    return {
      test: 10,
    };
  }

  function fillStoreWithValues() {
    vendingStoreMock.state = {
      ...vendingStoreMock.state,
      selectedItem: selectedItem,
      totalCashAmount: 10,
      vendingItems: [selectedItem],
    };
  }
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
    return of();
  }
  getCurrentState(): StoreState {
    return this.state;
  }
}
