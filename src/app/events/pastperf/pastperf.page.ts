import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from '../../services/authentication.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AlleventsService } from '../../services/allevents.service';
import * as firebase from 'firebase/app';
//import Firestore from 'firebase/firestore';
import 'firebase/storage';

@Component({
  selector: 'app-pastperf',
  templateUrl: './pastperf.page.html',
  styleUrls: ['./pastperf.page.scss'],
})
export class PastperfPage implements OnInit {

   infos = [];
   events = [];
   ref = firebase.database().ref('/kalasanman/events/PastPerformances');

   // Create a reference with an initial file path and name
   storageRef = firebase.storage().ref();

    constructor(
       private navCtrl: NavController,
       private authService: AuthenticateService,
       private alleventsService: AlleventsService,
       public alertController: AlertController,
   ) {

       console.log("PastperfPage constructor called")

       this.ref.on('value', resp => {
       this.infos = [];
       this.infos = snapshotToArray(resp);

       console.log(this.infos);
       //console.log(this.infos[0].Name);
     });
}

  ngOnInit() {    };
}

export const snapshotToArray = snapshot => {
    let returnArr = [];

    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        //console.log(item.ImageURL);
        //
        //
        returnArr.push(item);
    });

    return returnArr;
};
