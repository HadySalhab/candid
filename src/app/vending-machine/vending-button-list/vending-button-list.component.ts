import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import { VendingItem } from '@app/core/model/VendingItem';

@Component({
  selector: 'app-vending-button-list',
  templateUrl: './vending-button-list.component.html',
  styleUrls: ['./vending-button-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VendingButtonListComponent implements OnInit {
  @Input() items: VendingItem[];
  @Input() selectedItem: VendingItem;
  @Output() onSelection: EventEmitter<VendingItem> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  handleSelection(vendingItem: VendingItem) {
    this.onSelection.emit(vendingItem);
  }
}
