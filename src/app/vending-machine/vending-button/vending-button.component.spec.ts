import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendingButtonComponent } from './vending-button.component';

describe('VendingButtonComponent', () => {
  let component: VendingButtonComponent;
  let fixture: ComponentFixture<VendingButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendingButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendingButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
