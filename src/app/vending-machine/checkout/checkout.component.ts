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

import { ControlItem } from '@app/shared/controls/control-item.model';
import { PaymentsType } from '@app/core/model/PaymentsType';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CheckoutComponent implements OnInit {
  form: FormGroup;
  @Output() onCheckout: EventEmitter<PaymentsType> = new EventEmitter();
  @Input() isDisabled: boolean = false;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      payment: [
        PaymentsType.CASH,
        {
          updateOn: 'change',
          validators: [Validators.required],
        },
      ],
    });
  }

  handleCheckout(event: Event) {
    event.preventDefault();
    this.onCheckout.emit(this.form.controls['payment'].value);
  }

  get items(): ControlItem[] {
    return Object.keys(PaymentsType).map((type) => ({
      value: PaymentsType[type],
      label: PaymentsType[type],
    }));
  }
}
