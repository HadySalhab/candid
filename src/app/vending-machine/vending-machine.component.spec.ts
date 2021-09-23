import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { CommonModule } from '@angular/common';
import { CoreModule } from '@app/core/core.module';
import { DebugElement } from '@angular/core';
import { PaymentsType } from '@app/core/model/PaymentsType';
import { RestockData } from './restock/restock-data.model';
import { SharedModule } from '@app/shared/shared.module';
import { StoreActionsService } from '@app/core/services/store-actions/StoreActions.service';
import { StoreConfigService } from '@app/core/services/store-config/StoreConfig.service';
import { StoreSelectorsService } from '@app/core/services/store-selectors/StoreSelectors.service';
import { StoreState } from '@app/core/model/StoreState';
import { VendingItem } from '@app/core/model/VendingItem';
import { VendingMachineComponent } from './vending-machine.component';
import { VendingMachineModule } from './vending-machine.module';
import { VendingStore } from '@app/core/store/VendingStore.service';
import { share } from 'rxjs/operators';

describe('VendingMachineComponent', () => {
  let SUT: VendingMachineComponent;
  let fixture: ComponentFixture<VendingMachineComponent>;
  let storeActionsServiceMock: StoreActionsServiceMock;
  let storeSelectorsMock: StoreSelectorsMock;
  let el: DebugElement;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [VendingMachineComponent],
        imports: [VendingMachineModule],
        providers: [
          {
            provide: BsModalService,
          },
          {
            provide: StoreActionsService,
            useClass: StoreActionsServiceMock,
          },
          {
            provide: StoreSelectorsService,
            useClass: StoreSelectorsMock,
          },
        ],
      }).compileComponents();
      fixture = TestBed.createComponent(VendingMachineComponent);
      SUT = fixture.componentInstance;
      storeActionsServiceMock = TestBed.get(StoreActionsService);
      storeSelectorsMock = TestBed.get(StoreSelectorsService);
      el = fixture.debugElement;
    })
  );
  it('should create', () => {
    expect(SUT).toBeTruthy();
  });
  describe('ngOnInit()', () => {
    it('should populate vending items observable', async () => {
      SUT.ngOnInit();
      SUT.vendingItems$.subscribe((vendingItems) => {
        expect(vendingItems).toEqual([
          {
            flavour: {
              price: 10,
              name: 'test',
            },
            quantity: 10,
          },
        ]);
      });
    });
    it('should populate summary observable', async () => {
      SUT.ngOnInit();
      SUT.summary$.subscribe((summary) => {
        expect(summary).toEqual({
          totalCansSold: 0,
          totalCashAmount: 10,
          totalCreditCardAmount: 10,
          totalCansAvailable: 10,
        });
      });
    });
    it('should populate selected item observable', async () => {
      SUT.ngOnInit();
      SUT.selectedItem$.subscribe((selectedItem) => {
        expect(selectedItem).toEqual({
          flavour: {
            price: 10,
            name: 'test',
          },
          quantity: 10,
        });
      });
    });
  });
  describe('handleCheckout()', () => {
    it('should call storeActions.handleCheckout() with right parameter', () => {
      SUT.handleCheckout(PaymentsType.CASH);
      expect(storeActionsServiceMock.handleCheckoutCount).toEqual(1);
      expect(storeActionsServiceMock.paymentType).toEqual(PaymentsType.CASH);
    });
  });
  describe('handleSelection()', () => {
    it('should call storeActions.updateSelectedItem() with right parameter', () => {
      const selection: VendingItem = {
        flavour: {
          name: 'test',
          price: 10,
        },
        quantity: 10,
      };
      SUT.handleSelection(selection);
      expect(storeActionsServiceMock.updateSelectedItemCount).toEqual(1);
      expect(storeActionsServiceMock.vendingItem).toEqual(selection);
    });
  });
});

class VendingStoreMock extends VendingStore {
  updateState(newState: Partial<StoreState>, action: string): void {
    throw new Error('Method not implemented.');
  }
  getStateChange(): Observable<StoreState> {
    throw new Error('Method not implemented.');
  }
  getCurrentState(): StoreState {
    throw new Error('Method not implemented.');
  }
}

class StoreActionsServiceMock extends StoreActionsService {
  public paymentType: PaymentsType;
  public handleCheckoutCount = 0;
  public updateSelectedItemCount = 0;
  public vendingItem;
  protected initializeApp(): void {}
  public updateSelectedItem(vendingItem: VendingItem): void {
    this.updateSelectedItemCount++;
    this.vendingItem = vendingItem;
  }
  public handleCheckout(paymentType: PaymentsType): void {
    this.handleCheckoutCount++;
    this.paymentType = paymentType;
  }
  public handleRestock(restockData: RestockData): void {}
}

class StoreSelectorsMock extends StoreSelectorsService {
  getVendingItemsChange(): Observable<VendingItem[]> {
    // stub
    return of([
      {
        flavour: {
          price: 10,
          name: 'test',
        },
        quantity: 10,
      },
    ]);
  }
  getFullStateChange(): Observable<StoreState> {
    return of({
      selectedItem: null,
      totalCansSold: 0,
      totalCashAmount: 10,
      totalCreditCardAmount: 10,
      vendingItems: [
        {
          flavour: {
            price: 10,
            name: 'test',
          },
          quantity: 10,
        },
      ],
    });
  }
  getTotalNumberOfAvailableCans(): number {
    return 10;
  }
  getSelectedItemChange(): Observable<VendingItem> {
    return of({
      flavour: {
        price: 10,
        name: 'test',
      },
      quantity: 10,
    });
  }
  getState(): StoreState {
    return {
      selectedItem: null,
      totalCansSold: 0,
      totalCashAmount: 10,
      totalCreditCardAmount: 10,
      vendingItems: [],
    };
  }
}
