import { Component,ViewChild } from '@angular/core';
import { Nav,Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Events } from 'ionic-angular';

//import { LoginPage }  from '../pages/login/login';
import { ReportAbsenPage }  from '../pages/report-absen/report-absen';
import { LihatGajiPage }  from '../pages/lihat-gaji/lihat-gaji';
import { ViewBpjsPage }  from '../pages/view-bpjs/view-bpjs';
import { TrainingPage }  from '../pages/training/training';
import { MapViewPage } from '../pages/map-view/map-view';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CutiPage } from '../pages/cuti/cuti';
import { Storage } from '@ionic/storage';
import { CutiTabsPage } from '../pages/cuti-tabs/cuti-tabs';
import { ApprovalPage } from '../pages/approval/approval';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any;
  pages: Array<{title: string, component: any}>;
  nama: any;
  jabatan: any;
  foto: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public storage: Storage,public events: Events) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      
      this.events.subscribe('menu:tampilNama', (nama,jabatan,foto) => {
        // user and time are the same arguments passed in `events.publish(user, time)`
        this.nama    = nama;
        this.jabatan = jabatan; 
        this.foto    = foto; 

        if(this.foto == null){
            this.foto = "http://placehold.it/400x200";
        }
        
      });

      this.events.subscribe('menu:tampil', (menu) => {
        // user and time are the same arguments passed in `events.publish(user, time)`
        this.pages = menu;
      });

      storage.get('session').then((val) => {
        if(val == 'oke'){
          this.pages = [
          { title: 'Absen', component: HomePage },
          { title: 'Map', component: MapViewPage },
          { title: 'cuti', component: CutiPage },
          { title: 'Report Absen', component: ReportAbsenPage },
          { title: 'Lihat Gaji', component: LihatGajiPage },
          { title: 'Lihat BPJS', component: ViewBpjsPage },
          { title: 'Lihat Training', component: TrainingPage },
          { title: 'Logout', component: LoginPage },
          ];
          console.log('tampil', val);
          //this.rootPage = HomePage;
          this.rootPage = ApprovalPage;


        }else{
          console.log('login', val);
          //this.rootPage = LoginPage;
          this.rootPage = ApprovalPage;
        }
        
      });
      
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}

