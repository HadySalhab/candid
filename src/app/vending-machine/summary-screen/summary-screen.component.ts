import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

import { StoreState } from '@app/core/model/StoreState';
import { Summary } from './summary.model';

@Component({
  selector: 'app-summary-screen',
  templateUrl: './summary-screen.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryScreenComponent implements OnInit {
  @Input()
  summary: Summary;
  constructor() {}

  ngOnInit(): void {}
}
