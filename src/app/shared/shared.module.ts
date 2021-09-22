import { CommonModule } from '@angular/common';
import { InputModule } from './controls/input/input.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from './controls/select/select.module';

@NgModule({
  declarations: [],
  exports: [InputModule, SelectModule, ReactiveFormsModule],
  imports: [CommonModule, InputModule, SelectModule],
})
export class SharedModule {}
