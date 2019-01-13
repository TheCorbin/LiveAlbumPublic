import { AuthPopoverComponent } from './auth-popover/auth-popover.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';


@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [
    AuthPopoverComponent
  ],
  exports: [
    AuthPopoverComponent
  ],
  entryComponents: [AuthPopoverComponent]
})
export class ComponentsModule {}
