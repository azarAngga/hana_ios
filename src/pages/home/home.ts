import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { AlertController } from 'ionic-angular';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Headers, RequestOptions } from '@angular/http';

import { ReportAbsenPage }  from '../report-absen/report-absen';
import { LihatGajiPage }  from '../lihat-gaji/lihat-gaji';
import { ViewBpjsPage }  from '../view-bpjs/view-bpjs';
import { TrainingPage }  from '../training/training';
import { MapViewPage } from '../map-view/map-view';
import { LoginPage } from '../login/login';

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  status: any;
  nik: any;
  loader: any;
  indikator: any;
  title: any;
  action: any;
  validasi_masuk: any;
  validasi_pulang: any;
  lat: any;
  long: any;
  date: any;
  foto: any;
  uuid: any;
  absen: any;
  versi: any;
  pages: Array<{title: string, component: any}>;
  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  public http: Http,
  public toastCtrl: ToastController,
  public loadingCtrl: LoadingController,
  public geolocation: Geolocation,
  public storage: Storage,
  public events: Events,
  public alertCtrl: AlertController,
  private device: Device
  ){}

  ionViewDidLoad() {
    this.uuid = this.device.uuid;
    //this.uuid = "353421085034990";
    this.versi = "1";
    this.checkUpdate();
    this.storage.get('nik')
    .then((val) => {
        this.nik = val;
        this.loadNameJabatan();
        console.log('nik',this.nik);
        this.http.get('http://apps.telkomakses.co.id/hana/ios/get_data_hana_check_flagging_masuk.php?nik='+this.nik)
        .map(res => res.json())
        .subscribe(data =>{
          this.status = data['result'][0]['status'];
          console.log("status",this.status);
          if(this.status == 'n' ){
              this.validasi_masuk  = "ok";
              this.validasi_pulang = "nok";
              this.absen = "Absen Masuk";
          }else if(this.status  =='y masuk'){
            this.validasi_masuk  = "nok";
            this.validasi_pulang = "ok";
            this.absen = "Absen Pulang";
          }else{
            this.validasi_masuk  = "com";
            this.validasi_pulang = "com";
            this.absen = "Absen complete";
          }
        });
    });
    this.date = new Date();
    this.indikator = 'gps_nok.png';
    this.geolocation.getCurrentPosition().then((resp) => {
    this.indikator = 'green_indikator.png';
    this.lat = resp.coords.latitude;
    this.long = resp.coords.longitude;
    this.setLatitude(this.lat);
    this.setLongitude(this.long);

    })
    .catch((error) => {
      
    });

      let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
        try{
          this.indikator = 'green_indikator.png';
          this.lat = data.coords.latitude;
          this.long = data.coords.longitude;
          this.setLatitude(this.lat);
          this.setLongitude(this.long);
        }catch(err){
            
        }
      });

      //timer
      this.time();
  }

  putMasuk(){
    if(this.validasi_masuk == "ok"){
      if(this.indikator != 'gps_nok.png'){
          this.presentLoading();
          this.http.get('http://apps.telkomakses.co.id/hana/ios/put_data_hana_insert.php?nik='+this.nik+'&latitude='+this.lat+'&longitude='+this.long+'&jenis_absen=masuk&code=ionicIos&uuid='+this.uuid)
            .map(res =>res.json())
            .subscribe(data =>{
              console.log(data);
              if(data.result[0].status == 'sukses'){
                this.presentToast(data.alamat[0].alamat);
                this.loader.dismiss();
                this.validasi_masuk  = "nok";
                this.validasi_pulang = "ok";
                this.absen = "Absen Pulang";
                this.date = new Date();
              }else{
                this.loader.dismiss();
                 this.presentToast(data.result[0].status);
              }
            });
      }else{
          this.presentToast("Indikator GPS merah silahkan restart aplikasi");
      }
    }else if(this.validasi_masuk == "com"){
          this.presentToast("Anda Sudah complete");
    }else{
          this.presentToast("Anda sudah absen Masuk");
    }
	
  }

  putKeluar(){	
    if(this.validasi_pulang == "ok"){
      if(this.indikator != 'gps_nok.png'){
      	this.presentLoading();
            // console.log('http://10.40.108.153/hana/hana/ios/put_data_hana_insert.php?nik='+this.nik+'&latitude='+this.lat+'&longitude='+this.long+'&jenis_absen=keluar&code=ionicIos&uuid='+this.uuid);
      		  this.http.get('http://apps.telkomakses.co.id/hana/ios/put_data_hana_insert.php?nik='+this.nik+'&latitude='+this.lat+'&longitude='+this.long+'&jenis_absen=keluar&code=ionicIos&uuid='+this.uuid)
      			.map(res =>res.json())
      			.subscribe(data =>{
      				console.log(data);
      				if(data.result[0].status == 'sukses'){
      					this.presentToast(data.alamat[0].alamat);
      					this.loader.dismiss();
                this.validasi_pulang = "com";
                this.absen = "Absen complete";
                this.date = new Date();
      				}else{
      					this.loader.dismiss();
                this.presentToast(data.result[0].status);
      				}
      		});
      }else{
        this.presentToast("Indikator GPS merah silahkan restart aplikasi");
      }
    }else if(this.validasi_pulang == "com"){
        this.presentToast("Absen anda complete");
    }else{
       this.presentToast("Absen Masuk dulu kemudian absen pulang");
    }
  }

   presentToast(x) {
    let toast = this.toastCtrl.create({
      message: x,
      duration: 3000
    });
    toast.present();
  }

   presentLoading() {
	    this.loader = this.loadingCtrl.create({
	      content: "Please wait..."
	    });
	    this.loader.present();
  	}


    loadNameJabatan(){
      let nik = 
      [
        { nik: this.nik }
      ];

      let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      });

      let options = new RequestOptions({
        headers: headers
      });
      // TODO: Encode the values using encodeURIComponent().
      let body = 'nik='+this.nik;

      this.http.post('http://api.telkomakses.co.id/API/wimata/ws_get_data_all_or_one.php',body,options)
      .map(res =>res.json())
      .subscribe(data =>{
        console.log("dari api",data);

        this.storage.get('foto')
        .then((val) => {
          this.foto = val;
          this.events.publish('menu:tampilNama',data.name,data.nama_posisi,this.foto);
        });

        
      });
    }

    checkUpdate(){
      this.http.get('http://apps.telkomakses.co.id/hana/ios/news.php?versi='+this.versi).map(res => res.json()).subscribe(data => {
          var versi_now = data.update[0].versi;
          var trigger = data.update[0].tigger;
          var message = data.update[0].message;

          var message_news = data.news[0].message;
          var tigger_news  = data.news[0].trigger;

          if(this.versi < versi_now){
              if(trigger == 'on'){
                this.showAlert(message);
              }
          }else {
            if(trigger == 'on'){
            this.showAlert(message);
            }
          }

          if(tigger_news == 'on'){
               this.showAlertNews(message_news);
          }
      });
    }
    

    showAlert(x){
      let alert = this.alertCtrl.create({
        title: 'Hana update',
        subTitle: x,
        buttons: ['OK']
      });
      alert.present();
    }

    showAlertNews(x){
      let alert = this.alertCtrl.create({
        title: 'Hana News',
        subTitle: x,
        buttons: ['OK']
      });
      alert.present();
    }

    setLatitude(x){
      this.storage.set('latitude',x);
    }
    
    setLongitude(x){
      this.storage.set('longitude',x);
    } 

    time(){
      setTimeout(() => 
      {   
          this.time();
          this.date = new Date(); 
      },
      1000);
    }   

}
