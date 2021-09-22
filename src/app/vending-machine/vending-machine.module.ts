import { CheckoutComponent } from './checkout/checkout.component';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgModule } from '@angular/core';
import { SelectionScreenComponent } from './selection-screen/selection-screen.component';
import { SharedModule } from '@app/shared/shared.module';
import { SummaryScreenComponent } from './summary-screen/summary-screen.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { VendingButtonComponent } from './vending-button/vending-button.component';
import { VendingButtonListComponent } from './vending-button-list/vending-button-list.component';
import { VendingMachineComponent } from './vending-machine.component';
import { RestockComponent } from './restock/restock.component';

@NgModule({
  declarations: [
    VendingMachineComponent,
    ToolbarComponent,
    SummaryScreenComponent,
    VendingButtonComponent,
    VendingButtonListComponent,
    CheckoutComponent,
    SelectionScreenComponent,
    RestockComponent,
  ],
  imports: [CommonModule, SharedModule, ModalModule.forRoot()],
  exports: [VendingMachineComponent],
})
export class VendingMachineModule {}
