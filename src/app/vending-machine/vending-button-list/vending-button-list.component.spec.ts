import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendingButtonListComponent } from './vending-button-list.component';

describe('VendingButtonListComponent', () => {
  let component: VendingButtonListComponent;
  let fixture: ComponentFixture<VendingButtonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendingButtonListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendingButtonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
