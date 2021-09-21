import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnsureModuleLoadedOnceGuard } from './ensure-module-loaded-once.guard';
import { VendingStore } from './store/VendingStore';
import { VendingStoreImpl } from './store/VendingStoreImpl';
import { StoreActionsService } from './services/store-actions/StoreActions.service';
import { StoreActionsImplService } from './services/store-actions/StoreActionsImpl.service';

@NgModule({
  declarations: [],
  exports: [],
  imports: [CommonModule],
  providers: [
    {
      provide: VendingStore,
      useClass: VendingStoreImpl,
    },
    {
      provide: StoreActionsService,
      useClass: StoreActionsImplService,
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
