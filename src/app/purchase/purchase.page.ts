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
        console.log(this.infos[0].Name);
       });

   }

  ngOnInit() {

  if(this.authService.userDetails()){
        this.userEmail = this.authService.userDetails().email;
      }else{
        this.navCtrl.navigateBack('/login');
      }
  }

  goToTicketURL(URL) {

      //Go To external url for ticket purchase
      window.open(URL);

    }


  goToMembershipURL() {

      //Go To external url for ticket purchase
      window.open("https://www.hungamacity.com/membership/14/kalasanman-membership");

    }

  goToTicketURL(URL) {

          //Go To external url for ticket purchase
          window.open(URL);

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

