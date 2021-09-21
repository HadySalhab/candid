import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { VendingMachineModule } from './vending-machine/vending-machine.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule, // Singleton objects (services, components that are loaded only once, etc.)
    SharedModule, // Shared (multi-instance) objects,
    VendingMachineModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
