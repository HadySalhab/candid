import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ControlItem } from '@app/shared/controls/control-item.model';
import { PaymentsType } from '@app/core/model/PaymentsType';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  form: FormGroup;
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

  get items(): ControlItem[] {
    return Object.keys(PaymentsType).map((type) => ({
      value: PaymentsType[type],
      label: PaymentsType[type],
    }));
  }
}
