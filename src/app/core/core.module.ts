import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnsureModuleLoadedOnceGuard } from './ensure-module-loaded-once.guard';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { VendingStore } from './store/VendingStore';
import { VendingService } from './services/vending.service';
import { VendingImplService } from './services/vendingimpl.service';
import { VendingStoreImpl } from './store/VendingStoreImpl';

@NgModule({
  declarations: [ToolbarComponent],
  exports: [ToolbarComponent],
  imports: [CommonModule],
  providers: [
    {
      provide: VendingStore,
      useClass: VendingStoreImpl,
    },
    {
      provide: VendingService,
      useClass: VendingImplService,
    },
  ],
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  // Ensure that CoreModule is only loaded into AppModule
  // Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
