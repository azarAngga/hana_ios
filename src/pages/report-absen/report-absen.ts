import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';

/*
  Generated class for the ReportAbsen page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-report-absen',
  templateUrl: 'report-absen.html'
})
export class ReportAbsenPage {
  
  jenis_absen: any;
  tanggal: any;
  jam_masuk: any;
  jam_pulang: any;
  data_absen: any;
  loader: any;
  nik: any;

  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  public http: Http,
  public storage: Storage,
  public loadingCtrl: LoadingController) 
  {
  		this.presentLoading();
      this.storage.get('nik')
      .then((val) => {
        this.nik = val;
        //this.http.get('http://10.40.108.153/hana/hana/ios/get_data_hana_absen_naker.php?nik=95130650')
        this.http.get('http://apps.telkomakses.co.id/hana/get_data_hana_absen_naker.php?nik='+this.nik)
          .map(res => res.json())
          .subscribe(data =>{
            //console.log(data.result); 
            this.data_absen = data.result
            this.loader.dismiss();
          });
      });

  }

  ionViewDidLoad() {	
    console.log('ionViewDidLoad ReportAbsenPage');
  }
  
   presentLoading() {

    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();

  }

}
