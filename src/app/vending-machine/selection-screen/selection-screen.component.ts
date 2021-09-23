import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

import { VendingItem } from '@app/core/model/VendingItem';

@Component({
  selector: 'app-selection-screen',
  templateUrl: './selection-screen.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectionScreenComponent implements OnInit {
  @Input() selectedItem: VendingItem | null;
  constructor() {}

  ngOnInit(): void {}
}
