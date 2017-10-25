import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JajalPage } from './jajal';

@NgModule({
  declarations: [
    JajalPage,
  ],
  imports: [
    IonicPageModule.forChild(JajalPage),
  ],
  exports: [
    JajalPage
  ]
})
export class JajalPageModule {}
