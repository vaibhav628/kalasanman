import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AlleventsService } from '../services/allevents.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.page.html',
  styleUrls: ['./newsfeed.page.scss'],
})
export class NewsfeedPage implements OnInit {

  newsfeed = [];
  ref = firebase.database().ref('/kalasanman/news');
  //.orderByChild('Number')

  constructor(
           private navCtrl: NavController,
           private authService: AuthenticateService,
           private alleventsService: AlleventsService,
           public alertController: AlertController,
  ) {
            console.log("news constructor called")

            this.ref.on('value', resp => {
            this.newsfeed = [];
            this.newsfeed = snapshotToArray(resp);

            console.log(this.newsfeed);
            console.log(this.newsfeed[0].Headline);
     });
  }

    ngOnInit() {
  }

    externalURL(URL) {
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
