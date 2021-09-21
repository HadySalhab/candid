import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { VendingMachineComponent } from './vending-machine.component';
import { SummaryScreenComponent } from './summary-screen/summary-screen.component';

@NgModule({
  declarations: [VendingMachineComponent, ToolbarComponent, SummaryScreenComponent],
  imports: [CommonModule],
  exports: [VendingMachineComponent],
})
export class VendingMachineModule {}
