import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpModule} from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';
import { IonicStorageModule } from '@ionic/storage';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

import { MyApp } from './app.component';
import { GoogleMaps } from '@ionic-native/google-maps';
import { MapView2Page } from '../pages/map-view2/map-view2';

import { File } from '@ionic-native/file';

import { ReportAbsenPage }  from '../pages/report-absen/report-absen';
import { LihatGajiPage }  from '../pages/lihat-gaji/lihat-gaji';
import { ViewBpjsPage }  from '../pages/view-bpjs/view-bpjs';
import { TrainingPage }  from '../pages/training/training';
import { MapViewPage } from '../pages/map-view/map-view';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { CutiPage } from '../pages/cuti/cuti';
import { CutiTabsPage } from '../pages/cuti-tabs/cuti-tabs';
import { ListCutiPage } from '../pages/list-cuti/list-cuti';
import { ApprovalPage } from '../pages/approval/approval';




@NgModule({
  declarations: [
  LoginPage,
  CutiPage,
  CutiTabsPage,
  ListCutiPage,
  ApprovalPage,
  HomePage,
  ReportAbsenPage,
  LihatGajiPage,
  ViewBpjsPage,
  TrainingPage,
  MapView2Page,
  MapViewPage,
  MyApp
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
  LoginPage,
  CutiPage,
  ListCutiPage,
  CutiTabsPage,
  ApprovalPage,
  HomePage,
  ReportAbsenPage,
  LihatGajiPage,
  ViewBpjsPage,
  TrainingPage,
  MapView2Page,
  MapViewPage,
  MyApp
  ],
  providers: [
  File,
  FileTransferObject,
  FileTransfer,
  FilePath,
  Device,
  FileChooser,
  Geolocation,
     GoogleMaps,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
