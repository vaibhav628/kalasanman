import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AlleventsService } from '../services/allevents.service';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  bod = [];
  ref = firebase.database().ref('/kalasanman/BoD');


  constructor(
        private navCtrl: NavController,
        private authService: AuthenticateService,
        private alleventsService: AlleventsService,
        public alertController: AlertController,

  ) {

        console.log("about constructor called")

        this.ref.on('value', resp => {
        this.bod = [];
        this.bod = snapshotToArray(resp);

        console.log(this.bod);
        console.log(this.bod[0].Name);
       });

  }

  ngOnInit() {
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