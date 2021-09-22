import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SummaryScreenComponent } from './summary-screen/summary-screen.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { VendingMachineComponent } from './vending-machine.component';
import { VendingButtonComponent } from './vending-button/vending-button.component';
import { VendingButtonListComponent } from './vending-button-list/vending-button-list.component';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  declarations: [
    VendingMachineComponent,
    ToolbarComponent,
    SummaryScreenComponent,
    VendingButtonComponent,
    VendingButtonListComponent,
    CheckoutComponent,
  ],
  imports: [CommonModule],
  exports: [VendingMachineComponent],
})
export class VendingMachineModule {}
