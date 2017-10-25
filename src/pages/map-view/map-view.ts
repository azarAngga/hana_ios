import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { GoogleMaps,GoogleMap,GoogleMapsEvent,LatLng,CameraPosition,MarkerOptions,Marker } from '@ionic-native/google-maps';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
/**
 * Generated class for the MapViewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-map-view',
  templateUrl: 'map-view.html',
})
export class MapViewPage {
  loader: any;
  latitude: any;
  longitude: any;
  data_lokasi: any;
  length_data_lokasi: any;
  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  private googleMaps: GoogleMaps,
  public platform: Platform,
  public geolocation: Geolocation,
  public http: Http,
  public loadingCtrl: LoadingController,
  public storage: Storage) {

    this.presentLoading();
  }

  ngAfterViewInit() {
      this.storage.get('latitude')
      .then((val) => {

        // getlatitude from storage
        this.latitude = val;
        this.storage.get('longitude')
        .then((val) => {

          // getlongitude from storage
          this.longitude = val;

          // get http
          this.http.get('http://apps.telkomakses.co.id/hana/ios/get_data_hana_near_you.php?latitude='+this.latitude+'&longitude='+this.longitude)
          .map(res => res.json())
          .subscribe(data =>{
              // get data near you
              console.log(data.locations.length);
              this.length_data_lokasi = data.locations.length;
              this.data_lokasi = data.locations;

              // init map
              this.loadMap();
          }); 
        });
      });
  }

  loadMap() {
    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');
    let map: GoogleMap       = this.googleMaps.create(element);

    map.one(GoogleMapsEvent.MAP_READY).then(
     () => {
       console.log('Map is ready!');

       // create CameraPosition
       this.moveCamera(map);

       let ionic: LatLng;

       // create new marker user
       var ic_marker = "marker_user.png";
       this.addMarker(map,ionic,ic_marker,title,this.latitude,this.longitude);

       // pin marker kantor
       var ic_marker = "marker_office.png";
       for(var ini = 0;ini < this.length_data_lokasi;ini++){

          var lat  =  this.data_lokasi[ini].latitude;
          var long =  this.data_lokasi[ini].longitude;
          var title = this.data_lokasi[ini].title;

          // circle
          this.circle(map,lat,long);
                
          // create new marker
          this.addMarker(map,ionic,ic_marker,title,lat,long);

       }
    });

    this.loader.dismiss();
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapViewPage');
  }

  circle(map,latitude,longitude){
     var GOOGLE = {"lat" : latitude, "lng" : longitude};
      map.addCircle({
          'center': GOOGLE,
          'radius': 300,
          'strokeColor' : '#84DE02',
          'strokeWidth': 0,
          'fillColor' : '#84DE02'
      });
  }

  addMarker(map,ionic,ic_marker,title,latitude,longitude){
    ionic = new LatLng(latitude,longitude);
    let markerOptions: MarkerOptions = {
      position: ionic,
      title: title,
      icon: ic_marker
    };

    map.addMarker(markerOptions)
    .then((marker: Marker) => {
      marker.showInfoWindow();
    });
  }

  moveCamera(map){
    let position: CameraPosition = {
         target: {
           lat: this.latitude,
           lng: this.longitude
         },
         zoom: 15,
         tilt: 30
       };

       // move the map's camera to position
       map.moveCamera(position);
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();
  }

}
