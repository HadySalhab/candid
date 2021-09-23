import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { RestockData } from './restock-data.model';
import { StoreState } from '@app/core/model/StoreState';
import { VendingItem } from '@app/core/model/VendingItem';
import { isNumber } from '@app/shared/validators/number-validator';

@Component({
  selector: 'app-restock',
  templateUrl: './restock.component.html',
  styleUrls: ['./restock.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class RestockComponent implements OnInit {
  @Input() storeState: StoreState;
  @Input() totalCapacity: number;
  @Input() totalCansAvailable: number;
  @Output() onRestock: EventEmitter<RestockData> = new EventEmitter();
  newTotalNumberOfCansAvailable: number;

  form: FormGroup;
  constructor(private fb: FormBuilder, private bsModalRef: BsModalRef) {}

  ngOnInit(): void {
    this.newTotalNumberOfCansAvailable = this.totalCansAvailable;
    this.form = this.fb.group(this.createFormGroupFromVendingItemsAndReturn());
    this.form.valueChanges.subscribe((change) => {
      const totalAdded = Object.values(change).reduce(
        (prev: number, curr: number) => (prev || 0) + (curr || 0)
      ) as number;
      this.newTotalNumberOfCansAvailable = this.totalCansAvailable + totalAdded;
    });
  }
  handleRestock() {
    this.onRestock.emit(this.form.value);
    this.bsModalRef.hide();
  }
  handleClose() {
    this.bsModalRef.hide();
  }
  private createFormGroupFromVendingItemsAndReturn() {
    const group = {};
    const items = this.storeState.vendingItems;
    items.forEach((item) => {
      group[item.flavour.name] = [
        0,
        {
          updateOn: 'change',
          validators: [Validators.min(0), isNumber()],
        },
      ];
    });
    return group;
  }
  get isValid() {
    return this.form.valid && !this.isFull;
  }
  get isFull() {
    return this.remainingCapacity < 0;
  }
  get remainingCapacity() {
    return this.totalCapacity - this.newTotalNumberOfCansAvailable;
  }
  byName(index: number, item: VendingItem) {
    return item.flavour.name;
  }
}
