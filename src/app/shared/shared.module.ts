import { CommonModule } from '@angular/common';
import { InputComponent } from './controls/input/input.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [InputComponent],
  exports: [InputComponent],
  imports: [CommonModule],
})
export class SharedModule {}
