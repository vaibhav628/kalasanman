import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import * as firebase from 'firebase';
import { Utils } from '../services/util.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //articles;
  //constructor(private apiService: ApiService){}
  constructor(public alertController: AlertController, private util: Utils) {

  }

  //ionViewDidEnter(){

  //this.apiService.getNews().subscribe((data)=>{
  //  console.log(data);
  //  this.articles = data['articles'];
  //});
  //}

  alertEmailAddress() {
    this.presentAlert("Please write to us @ KalaSanmanCincy@gmail.com")
  }
  openWithSystemBrowser(url){
    this.util.openWithSystemBrowser(url);

  }
  async presentAlert(alertMessage: string) {

    console.log("called function presentAlert in membership");
    const alert = await this.alertController.create({
      header: 'Information:',
      subHeader: '',
      message: alertMessage,
      buttons: ['OK']
    });

    await alert.present();
  }

/*
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    var storageRef = firebase.storage().ref('KalaSanman/logo');
    storageRef.child('logo_1024x1024.png').getDownloadURL().then(function(url) {


      // Or inserted into an <img> element:

      var img = document.getElementById('myimg');
      (<HTMLImageElement>img).src = url;
    }).catch(function(error) {
      // Handle any errors
    });
  }
  */
}
