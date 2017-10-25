import { Component } from '@angular/core';


import { CutiPage } from '../cuti/cuti';
import { ListCutiPage } from '../list-cuti/list-cuti';

@Component({
  selector: 'page-cuti-tabs',
  templateUrl: 'cuti-tabs.html',
})
export class CutiTabsPage {

   tab1Root: any = CutiPage;
   tab2Root: any = ListCutiPage;

}
