import { CommonModule } from '@angular/common';
import { InputComponent } from './controls/input/input.component';
import { InputModule } from './controls/input/input.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  exports: [InputModule, ReactiveFormsModule],
  imports: [CommonModule, InputModule],
})
export class SharedModule {}
