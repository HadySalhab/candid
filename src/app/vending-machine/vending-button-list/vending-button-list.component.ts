import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { VendingItem } from '@app/core/model/VendingItem';

@Component({
  selector: 'app-vending-button-list',
  templateUrl: './vending-button-list.component.html',
  styleUrls: ['./vending-button-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VendingButtonListComponent implements OnInit {
  @Input() items: VendingItem[];
  constructor() {}

  ngOnInit(): void {}
}
