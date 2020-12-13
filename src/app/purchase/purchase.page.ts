import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AlleventsService } from '../services/allevents.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.page.html',
  styleUrls: ['./purchase.page.scss'],
})
export class PurchasePage implements OnInit {

   infos = [];
   ref = firebase.database().ref('/kalasanman/events/upcoming');

   membershipurl=[];
   membershipref = firebase.database().ref('/kalasanman/Membership');

   constructor(
              private navCtrl: NavController,
              private authService: AuthenticateService,
              private alleventsService: AlleventsService,
              public alertController: AlertController,
   ) {

        console.log("Purchase constructor called")

        this.ref.on('value', resp => {
        this.infos = [];
        this.infos = snapshotToArray(resp);

        console.log(this.infos);
        //console.log(this.infos[0].Name);
       });

       //Get membership URL. This should return only one entry
       this.membershipref.on('value', resp => {
               this.membershipurl = [];
               this.membershipurl = snapshotToArray(resp);

               console.log(this.membershipurl);

       });
   }

  ngOnInit() {

  //if(!this.authService.userDetails()) {

  //      this.presentAlert("Please login to purchase tickets!");
  //      this.navCtrl.navigateBack('/login');
  //    }
  }

  goToMembershipURL(URL) {

      //Go To external url for ticket purchase
      //This needs to come from firestore
      //window.open("https://www.hungamacity.com/membership/33/kalasanman-annual-membership-2021");
      window.open(URL);
    }

  goToTicketURL(URL) {

          //Go To external url for ticket purchase
          window.open(URL);

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

