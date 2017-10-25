import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CutiTabsPage } from './cuti-tabs';

@NgModule({
  declarations: [
    CutiTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(CutiTabsPage),
  ],
})
export class CutiTabsPageModule {}
