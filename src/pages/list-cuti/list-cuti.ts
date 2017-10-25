
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';

/**
 * Generated class for the ListCutiPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-cuti',
  templateUrl: 'list-cuti.html',
})
export class ListCutiPage {
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
  data_jenis_cuti: any;

  data_cuti: any;

  loader: any;

  	// date
  	tanggal_mulai: any;
	tanggal_selesai: any;
	date1_v: any;
  	date2_v: any;
  	data_count: any;
  	type_cuti: any;


  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  public http: Http,
  public storage: Storage,
  public loadingCtrl: LoadingController) {
  	this.data_count = 0;

  	this.dateDefault();
    this.storage.get('nik')
	    .then((val) => {
	    this.nik = val;
	    // get data form slip gaji
   		this.getSelect(val);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LihatGajiPage');
  }

  putSubmit(){
        // get data slip gaji & penghasilan
        this.presentLoading();
        console.log("http://10.40.108.153/api_test/absen/ios/get_data_list_cuti.php?start_date="+this.date1_v+"&end_date="+this.date2_v+"&nik="+this.nik+"&type="+this.type_cuti);
        this.http.get("http://10.40.108.153/api_test/absen/ios/get_data_list_cuti.php?start_date="+this.date1_v+"&end_date="+this.date2_v+"&nik="+this.nik+"&type="+this.type_cuti)
            .map(res => res.json())
            .subscribe(data =>{
            	try{
            		this.data_cuti = data;
	            	this.data_count = data.length;
	            	
	            	
	            	//this.loader.dissmis();
            	}catch(err){
            		this.data_count = 0;
            	}
            	this.loader.dismiss();
            });
  }

  	dateDefault(){
		this.tanggal_mulai 		= new Date().toISOString();
		this.tanggal_selesai 	= new Date().toISOString();
		var date1 = new Date();
		this.date1_v = date1.getFullYear()+"/"+(date1.getMonth()+1)+"/"+date1.getDate();
	  	this.date2_v = date1.getFullYear()+"/"+(date1.getMonth()+1)+"/"+date1.getDate();
	}

  	presentLoading(){
	    this.loader = this.loadingCtrl.create({
	      content: "Please wait..."
	    });
	    this.loader.present();
  	}

  	getSelect(nik: any){
  		this.presentLoading();
  		 this.http.get("http://10.40.108.153/hana/hana/ios/get_data_hana_form_cuti.php?nik="+nik)
	      .map(res =>res.json())
	      .subscribe(data =>{
	        this.data_jenis_cuti = data.jenis_cuti;
	        this.type_in = data.jenis_cuti[0].category_name;
	        this.type_cuti = data.jenis_cuti[0].leave_category_id;
	        console.log("ini",data.jenis_cuti[0].leave_category_id);
	        this.loader.dismiss();
	      });
  	}

  		// event changed berangkat
	onChangeMulai(ev: any) {
		// value event to date1
	    var date1  = new Date(ev.month.value+"/"+ev.day.value+"/"+ev.year.text);
	    this.date1_v = ev.year+"/"+ev.month+"/"+ev.day; 
		
	}
 
	// event changed pulang
	onChangeSelesai(ev: any){
	    var date2 		= new Date(ev.month.value+"/"+ev.day.value+"/"+ev.year.text);
	    this.date2_v 	= ev.year+"/"+ev.month+"/"+ev.day;
	 	
	}

	onChangeType(ev: any){
		console.log("onChangeType",ev);
		this.type_cuti = ev;
	}

}
