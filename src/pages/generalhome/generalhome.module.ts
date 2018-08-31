import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GeneralhomePage } from './generalhome';

@NgModule({
  declarations: [
    GeneralhomePage,
  ],
  imports: [
    IonicPageModule.forChild(GeneralhomePage),
  ],
})
export class GeneralhomePageModule {}
