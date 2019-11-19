import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from '../../services/authentication.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AlleventsService } from '../../services/allevents.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.page.html',
  styleUrls: ['./upcoming.page.scss'],
})
export class UpcomingPage implements OnInit {

 infos = [];
 ref = firebase.database().ref('/kalasanman/events/Upcoming');

  constructor(
         private navCtrl: NavController,
         private authService: AuthenticateService,
         private alleventsService: AlleventsService,
         public alertController: AlertController,
  ) {

     console.log("Upcoming Events constructor called")

     this.ref.on('value', resp => {
         this.infos = [];
         this.infos = snapshotToArray(resp);

         console.log(this.infos);
         console.log(this.infos[0].Name);
       });

  }

  ngOnInit() {
  };

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

