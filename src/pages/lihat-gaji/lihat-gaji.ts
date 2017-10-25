import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
/*
  Generated class for the LihatGaji page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-lihat-gaji',
  templateUrl: 'lihat-gaji.html'
})
export class LihatGajiPage {
  bulan: any;
  tahun: any;
  type: any;
  default: any;

  bulan_in: any;
  tahun_in: any;
  type_in: any;

  json_slip_gaji: any;
  json_penghasilan: any;
  json_potongan: any;  

  total_gaji: any;
  total_potongan: any;
  gaji_bersih: any;
  kalimat: any;
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
    // get data form slip gaji
    this.http.get('http://10.40.108.153/hana/hana/ios/get_data_hana_slip_gaji.php')
      .map(res =>res.json())
      .subscribe(data =>{
        this.bulan = data.bulan;
        this.tahun = data.tahun;
        this.type  = data.type;
        this.default = data.default[0].defult_bulan-1;
        this.bulan_in = data.bulan[this.default].bulan;
        this.tahun_in = data.tahun[0].tahun;
        this.type_in = data.type[0].type;          

      });
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LihatGajiPage');
  }

  putSubmit(){
        // get data slip gaji & penghasilan
        this.presentLoading();
        console.log("http://apps.telkomakses.co.id/hana/get_data_hana_data_slip_gaji.php?nik="+this.nik+"&bulan="+this.bulan_in+"&tahun="+this.tahun_in);
        this.http.get("http://apps.telkomakses.co.id/hana/get_data_hana_data_slip_gaji.php?nik="+this.nik+"&bulan="+this.bulan_in+"&tahun="+this.tahun_in)
            .map(res => res.json())
            .subscribe(data =>{
              this.json_slip_gaji = data.data_diri;
              this.kalimat = data.data_diri[0].kalimat2;

              this.json_penghasilan =  data.penghasilan;
              this.json_potongan =  data.potongan;
              
              this.total_gaji =  data.total_gaji;
              this.total_potongan =  data.total_potongan;
              this.gaji_bersih =  data.gaji_bersih; 
              this.loader.dismiss();
        });
  }

  presentLoading(){
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();
  }

}
