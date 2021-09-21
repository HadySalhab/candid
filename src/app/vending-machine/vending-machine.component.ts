import { Component, OnInit } from '@angular/core';

import { VendingService } from '@app/core/services/vending.service';

@Component({
  selector: 'app-vending-machine',
  templateUrl: './vending-machine.component.html',
})
export class VendingMachineComponent implements OnInit {
  constructor(private vs: VendingService) {}

  ngOnInit(): void {}
}
