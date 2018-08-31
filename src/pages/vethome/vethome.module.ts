import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VethomePage } from './vethome';

@NgModule({
  declarations: [
    VethomePage,
  ],
  imports: [
    IonicPageModule.forChild(VethomePage),
  ],
})
export class VethomePageModule {}
