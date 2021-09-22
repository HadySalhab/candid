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
  selector: 'app-vending-button',
  templateUrl: './vending-button.component.html',
  styleUrls: ['./vending-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VendingButtonComponent implements OnInit {
  @Input()
  vendingItem: VendingItem;
  @Input()
  isSelected: boolean;
  @Output()
  onSelection: EventEmitter<VendingItem> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  handleSelection() {
    this.onSelection.emit(this.vendingItem);
  }
}
