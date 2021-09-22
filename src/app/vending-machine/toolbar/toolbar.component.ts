import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent implements OnInit {
  @Output()
  onRestock = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
  handleRestock() {
    this.onRestock.emit();
  }
}
