import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular'
import { NavController, NavParams } from 'ionic-angular';
import { Http,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
import { CutiTabsPage } from '../cuti-tabs/cuti-tabs';

import { FileChooser } from '@ionic-native/file-chooser';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
//import { File } from '@ionic-native/file';

/*
  Generated class for the FormCuti page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
   selector: 'page-cuti',
  templateUrl: 'cuti.html',
})
export class CutiPage {
	json_data_atasan: any;
	json_data_pemeriksa: any;
	json_data_jenis: any;
	json_data_balance_cuti_tahunan: any;

	path: any;
	nama_file: any;
	jatah: any;
	cek: any;
	jumlah: any;
	pepperoni: any;

	alamat: any;
	no_telp: any;
	alasan: any;

	nama_atasan: any;
	nik_atasan: any;
	jabatan_atasan: any;

	nama_pemeriksa: any;
	nik_pemeriksa: any;
	jabatan_pemeriksa: any;

	jenis_cuti_in: any;
	tanggal_mulai: any;
	tanggal_selesai: any;
	data_wo: any;

	date1: any;
	date2: any;
	date1_v: any;
	date2_v: any;
	total_cuti: any;
	jenis: any;

	nik: any;
	constructor(private viewCtrl: ViewController,
		public navCtrl: NavController,
		public navParams: NavParams,
		public http: Http,
		private fileChooser: FileChooser,
		public alertCtrl: AlertController,
		private filePath: FilePath,
		private file: File,
		public TransferObject: FileTransferObject,
		private transfer: FileTransfer) {
		this.nik = '95130650';
		this.jumlah = 1;
		this.dateDefault();
      	
		this.http.get("http://10.40.108.153/hana/hana/ios/get_data_hana_form_cuti.php?nik="+this.nik)
		.map(res => res.json())
		.subscribe(data => {

			this.json_data_atasan 					= data.atasan[0];
			this.json_data_pemeriksa 				= data.pemeriksa[0];
			this.json_data_balance_cuti_tahunan 	= data.balance_cuti_tahunan[0];
			this.json_data_jenis 					= data.jenis_cuti;

			this.nama_atasan 		= this.json_data_atasan.nama;
			this.nik_atasan 		= this.json_data_atasan.nik;
			this.jabatan_atasan 	= this.json_data_atasan.jabatan;
			this.jatah 				= this.json_data_balance_cuti_tahunan.balance_now;

			this.nama_pemeriksa 	= this.json_data_pemeriksa.nama;
			this.nik_pemeriksa 		= this.json_data_pemeriksa.nik;
			this.jabatan_pemeriksa 	= this.json_data_pemeriksa.jabatan;

			this.jenis_cuti_in = this.json_data_jenis[0].category_name;
			this.jenis = this.json_data_jenis[0].leave_category_id;
			console.log("jenis",this.jenis);
		});
	}

	// event changed berangkat
	onChangeMulai(ev: any) {
		// value event to date1
	    var date1  = new Date(ev.month.value+"/"+ev.day.value+"/"+ev.year.text);
	    this.date1 = date1;
	    this.date1_v = ev.year+"-"+ev.month+"-"+ev.day; 
		this.cekCuti(this.jenis,this.nik,"cek_hari",this.cek,this.date1_v,this.date2_v,"1");
	}
 
	// event changed pulang
	onChangeSelesai(ev: any){
	    var date2 		= new Date(ev.month.value+"/"+ev.day.value+"/"+ev.year.text);
	    this.date2 		= date2;
	    this.date2_v 	= ev.year+"-"+ev.month+"-"+ev.day;
	 	this.cekCuti(this.jenis,this.nik,"cek_hari",this.cek,this.date1_v,this.date2_v,"2");   
	}

  ionViewDidLoad(){
    console.log('ionViewDidLoad FormCutiPage');
  }

  onChange(ev: any,ex: any){
  		this.jenis = ev;
  		this.jenis_cuti_in = ex;
	  	this.cekCuti(this.jenis,this.nik,"cek_jumlah","","","","0");
  }

  openFile(){
  	//this.file.checkDir(this.file.dataDirectory, '/').then(_ => console.log('Directory exists')).catch(err => console.log('Directory doesnt exist'));
  	this.fileGet();
  }

  actionSubmit(){

  	this.upload(this.nama_file,this.path);
  	
  }

  fileGet(){
      var path;
      this.fileChooser.open()
          .then(uri => {
             this.filePath.resolveNativePath(uri)
            .then(filePath => {
              this.path = filePath;

              var nama_ori = filePath.split("/");
              var index_path  = nama_ori.length;
              if(
                nama_ori[index_path-1].indexOf(".jpg") > 0  || 
                nama_ori[index_path-1].indexOf(".jpeg") > 0 || 
                nama_ori[index_path-1].indexOf(".png") > 0 || 
                nama_ori[index_path-1].indexOf(".PNG") > 0 ||
                nama_ori[index_path-1].indexOf(".JPG") > 0 ||
                nama_ori[index_path-1].indexOf(".JPEG") > 0 ||
                nama_ori[index_path-1].indexOf(".pdf") > 0 ||
                nama_ori[index_path-1].indexOf(".PDF") > 0
                ){
                this.nama_file = nama_ori[index_path-1];
              }else{
                this.path = "-";
                this.showAlert("File yang di perbolehkan {.jpg, .jpeg, .png, .PNG, .JPG, .JPEG, .pdf, .PDF}");
              }
              
              //this.showAlertNews(this.nama_file);
            })
            .catch(err => {});
          })
          .catch(e => {});
    }

   showAlert(x){
      let alert = this.alertCtrl.create({
        title: 'Warning',
        subTitle: x,
        buttons: ['OK']
      });
      alert.present();
    }

    cekCuti(jenis: any,nik: any,tipe: any,cek: any,tgl_s: any,tgl_e: any,method: any){
    	
	    let headers = new Headers({
	  		'Content-Type' : 'application/x-www-form-urlencoded'
	  	});	

	  	// create option 
	  	let requestOptions = new RequestOptions({
	  		headers : headers
	  	});

	  	let wo = 'tipe='+tipe+'&jenis='+jenis+'&nik='+nik+'&cek='+cek+'&tgl_s='+tgl_s+'&tgl_e='+tgl_e;
	  	
	  	//execute url post
	  	this.http.post('http://10.40.108.153/api_test/absen/cek_cuti_2.php',wo,requestOptions)
	  	.map(res => res.json())
	  	.subscribe(data => {
	  		var gtl_count = parseInt(data.cnt);
	  		var balance   = parseInt(data.balance);
	  		
	  		if(method == "0"){
		  		this.jatah = data;
		  		if(data < 0){
		  			this.jatah = 0;	
		  		}
	  		}else if(method == "1"){
	  			if(data.ket == null){
	  				this.showAlert("Tanggal yang anda inputkan tidak sesuai");
	  				this.dateDefault();
	  			}else if(gtl_count > balance){
	  				this.showAlert("Tanggal yang anda masukan melebihi Jatah cuti");
	  				this.dateDefault();
	  			}else{
	  				this.jumlah = data.cnt;	
	  			}
	  		}else if(method == "2"){
	  			if(data.ket == null){
	  				this.showAlert("Tanggal yang anda inputkan tidak sesuai");
	  				this.dateDefault();
	  			}else if(gtl_count > balance){
	  				this.showAlert("Tanggal yang anda masukan melebihi Jatah cuti");
	  				this.dateDefault();
	  			}else{
	  				this.jumlah = data.cnt;	
	  			}
	  		}else if(method == "3"){
	  			if(data.ket == null){
	  				this.showAlert("Tanggal yang anda inputkan tidak sesuai");
	  				this.dateDefault();
	  			}else if(gtl_count > balance){
	  				this.showAlert("Tanggal yang anda masukan melebihi Jatah cuti");
	  				this.dateDefault();
	  			}else{
	  				this.jumlah = data.cnt;	
	  			}
	  		}
	  	});
    }

    dateDefault(){
    	this.cek = false;
    	this.pepperoni = false;
    	this.tanggal_mulai 		= new Date().toISOString();
		this.tanggal_selesai 	= new Date().toISOString();
    	var date1 = new Date();
    	this.date1_v = date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();
      	this.date2_v = date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();
    }

    onChangeToogle(ex: any){
	this.cek = ex.checked; 
	console.log("bekerja");
    	if(this.cek){
    		this.cekCuti(this.jenis,this.nik,"cek_hari","v",this.date1_v,this.date2_v,"3");
    	}else{
			this.cekCuti(this.jenis,this.nik,"cek_hari","n",this.date1_v,this.date2_v,"3");
    	}
    }

    upload(nama,path){
      var options = {
        fileKey: "file",
        fileName: nama,
        chunkedMode: false,
        mimeType: "multipart/form-data",
        params : {'fileName': nama}
      };
     
      var url = "http://apps.telkomakses.co.id/amalia/upload.php";
      const fileTransfer: FileTransferObject = this.transfer.create();
     
      //Use the FileTransfer to upload the image
      fileTransfer.upload(path, url, options).then(data => {
      	this.actionInsert();

      }, err => {

      	this.showAlert("upload data gagal mohon ulangi lagi");
      });

    }

    actionInsert(){
    	var body = "?nik="+this.nik+
	  	"&leave_category_id="+this.jenis+
	  	"&start_dat="+this.date1_v+
	  	"&end_dat="+this.date2_v+
	  	"&num_of_day="+this.jumlah+
	  	"&alamat="+this.alamat+
	  	"&telp="+this.no_telp+
	  	"&alasan="+this.alasan+
	  	"&app_hr="+this.nik_atasan+
	  	"&app_manager="+this.nik_pemeriksa;
	  	console.log("http://10.40.108.153/hana/hana/ios/put_data_hana_form_cuti.php"+body);
	  	this.http.get("http://10.40.108.153/hana/hana/ios/put_data_hana_form_cuti.php"+body)
	  	//.map(res => res.json())
	  	.subscribe(data => {
	  		this.showAlert(data['_body']);
	  		if(data['_body']=='Input form cuti berhasil'){
	  			this.navCtrl.setRoot(CutiTabsPage);
	  		}
	  		console.log(data);
	  	});
    }

}
