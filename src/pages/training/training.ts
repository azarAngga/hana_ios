import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Training page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-training',
  templateUrl: 'training.html'
})
export class TrainingPage {
	nik: any;
	json_brevet: any;
	json_sertifikat_list: any;
	json_pelatihan_eksternal_list: any;
	json_pelatihan_internal_list: any;
	json_reward_list: any;
	json_assessment_list: any;
	json_elearning_list: any;

  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  public storage: Storage,
  public http: Http) {
    this.storage.get('nik')
    .then((val) => {
      this.nik = val;
      // get data form slip gaji
      this.http.get('http://apps.telkomakses.co.id/hana/get_data_hana_training.php?nik='+this.nik)
        .map(res =>res.json())
        .subscribe(data =>{
            console.log(data.brevet_list);  
            this.json_brevet = data.brevet_list;
            this.json_sertifikat_list = data.sertifikat_list;
            this.json_pelatihan_eksternal_list = data.pelatihan_eksternal_list;
            this.json_pelatihan_internal_list = data.pelatihan_internal_list;
            this.json_reward_list = data.reward_list;
            this.json_assessment_list = data.assessment_list;
            this.json_elearning_list = data.elearning_list;
        });  
    });
	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrainingPage');
  }

}
