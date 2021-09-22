import { Component, Input, OnInit } from '@angular/core';

import { VendingItem } from '@app/core/model/VendingItem';

@Component({
  selector: 'app-vending-button',
  templateUrl: './vending-button.component.html',
  styleUrls: ['./vending-button.component.scss'],
})
export class VendingButtonComponent implements OnInit {
  @Input()
  vendingItem: VendingItem;
  constructor() {}

  ngOnInit(): void {}
}
