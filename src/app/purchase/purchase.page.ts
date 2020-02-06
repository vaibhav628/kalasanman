import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AlleventsService } from '../services/allevents.service';
import * as firebase from 'firebase/app';
import { Utils } from '../services/util.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.page.html',
  styleUrls: ['./purchase.page.scss'],
})
export class PurchasePage implements OnInit {

   infos = [];
   ref = firebase.database().ref('/kalasanman/events/upcoming');

   constructor(
              private navCtrl: NavController,
              private authService: AuthenticateService,
              private alleventsService: AlleventsService,
              public alertController: AlertController,
              private util: Utils

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
      this.util.openWithSystemBrowser("https://www.hungamacity.com/membership/14/kalasanman-membership");
    }

  goToTicketURL(URL) {
      this.util.openWithSystemBrowser(URL);
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
