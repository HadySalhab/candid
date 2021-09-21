import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { VendingMachineComponent } from './vending-machine.component';

@NgModule({
  declarations: [VendingMachineComponent, ToolbarComponent],
  imports: [CommonModule],
  exports: [VendingMachineComponent],
})
export class VendingMachineModule {}
