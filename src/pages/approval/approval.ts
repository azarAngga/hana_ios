import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the ApprovalPage tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */

@IonicPage()
@Component({
  selector: 'page-approval',
  templateUrl: 'approval.html'
})
export class ApprovalPage {

  tabCutiRoot = 'TabCutiPage'
  tabSppdRoot = 'TabSppdPage'


  constructor(public navCtrl: NavController) {}

}
