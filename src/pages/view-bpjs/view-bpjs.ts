import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

import { LoadingController } from 'ionic-angular';

/*
  Generated class for the ViewBpjs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-view-bpjs',
  templateUrl: 'view-bpjs.html'
})
export class ViewBpjsPage {
	json_nama_foto: any;
	nik: any;
	loader: any;

  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  public http: Http,
  public storage: Storage,
  public loadingCtrl: LoadingController) {
    this.storage.get('nik')
    .then((val) => {
      this.nik = val;
      this.presentLoading();
      this.http.get("http://apps.telkomakses.co.id/hana/get_data_hana_image_bpjs.php?nik="+this.nik)
        .map(res=>res.json())
        .subscribe( data =>{
          this.json_nama_foto = "http://apps.telkomakses.co.id/wimata/kartu_bpjs/"+data.result[0].image;
          console.log(this.json_nama_foto);
          this.loader.dismiss();
        });
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewBpjsPage');
  }

  presentLoading(){
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();
  }

}
