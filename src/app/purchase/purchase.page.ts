import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AlleventsService } from '../services/allevents.service';
import * as firebase from 'firebase/app';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.page.html',
  styleUrls: ['./purchase.page.scss'],
})
export class PurchasePage implements OnInit {
  options : InAppBrowserOptions = {
      location : 'yes',//Or 'no'
      hidden : 'no', //Or  'yes'
      clearcache : 'yes',
      clearsessioncache : 'yes',
      zoom : 'yes',//Android only ,shows browser zoom controls
      hardwareback : 'yes',
      mediaPlaybackRequiresUserAction : 'no',
      shouldPauseOnSuspend : 'no', //Android only
      closebuttoncaption : 'Close', //iOS only
      disallowoverscroll : 'no', //iOS only
      toolbar : 'yes', //iOS only
      enableViewportScale : 'no', //iOS only
      allowInlineMediaPlayback : 'no',//iOS only
      presentationstyle : 'pagesheet',//iOS only
      fullscreen : 'yes',//Windows only
};
   infos = [];
   ref = firebase.database().ref('/kalasanman/events/upcoming');

   constructor(
              private navCtrl: NavController,
              private authService: AuthenticateService,
              private alleventsService: AlleventsService,
              public alertController: AlertController,
              private theInAppBrowser: InAppBrowser
   ) {

        console.log("Purchase constructor called")

        this.ref.on('value', resp => {
        this.infos = [];
        this.infos = snapshotToArray(resp);

        console.log(this.infos);
        console.log(this.infos[0].Name);
       });

   }

  ngOnInit() {

  if(!this.authService.userDetails()) {

        this.presentAlert("Please login to purchase tickets!");
        this.navCtrl.navigateBack('/login');
      }
  }

  goToMembershipURL() {

      //Go To external url for ticket purchase
      //window.open("https://www.hungamacity.com/membership/14/kalasanman-membership",'_blank');
      this.openWithSystemBrowser("https://www.hungamacity.com/membership/14/kalasanman-membership");
    }

  goToTicketURL(URL) {
      this.openWithSystemBrowser(URL);
          //Go To external url for ticket purchase
          //window.open(URL);

        }

        async presentAlert(alertMessage: string) {

                console.log("called function presentAlert with param");
                const alert = await this.alertController.create({
                  header: 'Alert',
                  subHeader: '',
                  //message: this.errorMessage,
                  message: alertMessage,
                  buttons: ['OK']
                });

                await alert.present();
       }
       public openWithSystemBrowser(url : string){
           let target = "_system";
           this.theInAppBrowser.create(url,target,this.options);
       }
       public openWithInAppBrowser(url : string){
           let target = "_blank";
           this.theInAppBrowser.create(url,target,this.options);
       }
       public openWithCordovaBrowser(url : string){
           let target = "_self";
           this.theInAppBrowser.create(url,target,this.options);
       }
}

export const snapshotToArray = snapshot => {
    let returnArr = [];

    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });

    return returnArr;
};
