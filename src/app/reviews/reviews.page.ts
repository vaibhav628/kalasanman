import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { MembersService } from '../services/members.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
})
export class ReviewsPage implements OnInit {

   validations_form: FormGroup;
   userEmail: string;
   alertMessage: string;
   eventname: string;

   reviews = [];
   ref = firebase.database().ref('/kalasanman/reviews').orderByChild('modified');

    slideOptions = {
       initialSlide: 1,
       speed: 400,
     };

  constructor(

          private navCtrl: NavController,
          private authService: AuthenticateService,
          private formBuilder: FormBuilder,
          private membersService: MembersService,
          public alertController: AlertController,
          public activatedRoute : ActivatedRoute,

  ) {

          console.log("reviews constructor called")
          this.ref.on('value', resp => {
          this.reviews = [];
          this.reviews = snapshotToArray(resp);
          console.log(this.reviews);
          //console.log(this.reviews[0].email);
      });
  }

   slidesDidLoad(slides: IonSlides) {
      slides.startAutoplay();
    }

  validation_messages = {
                'fname': [
                    { type: 'required', message: 'Name is required.' },
                    { type: 'minlength', message: 'Name must be at least 3 characters long.' },
                    { type: 'pattern', message: 'Enter valid name' },
                  ],
                'review': [
                    { type: 'required', message: 'Review is required.' },
                    { type: 'minlength', message: 'Name must be at least 3 characters long.' },
                  ],
                'eventname': [
                    { type: 'required', message: 'Event name is required.' },
                    { type: 'minlength', message: 'Event name must be at least 3 characters long.' },
                  ],
                'email': [
                        { type: 'required', message: 'Email is required.' },
                        { type: 'pattern', message: 'Please enter a valid email.' }
                  ],
  };

  ngOnInit() {

    //if(this.authService.userDetails()){
    //        this.userEmail = this.authService.userDetails().email;
    //      }else{

    //            this.presentAlert("Please login to provide your feedback!");
    //        this.navCtrl.navigateBack('/login');
    //      }

     this.validations_form = this.formBuilder.group({
           email: new FormControl('', Validators.compose([
             Validators.required,
             Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
           ])),
           fname: new FormControl('', Validators.compose([
             Validators.minLength(3),
             Validators.required,
             Validators.pattern('^[a-zA-Z +-]+$')
           ])),
           eventname: new FormControl('', Validators.compose([
             Validators.minLength(3),
             Validators.required
            ])),
           review: new FormControl('', Validators.compose([
             Validators.minLength(3),
             Validators.required
            ]))
         });
  }

      // Calling service to save review
      saveReview(record) {

        console.log(record);
        record.email = this.userEmail;
        console.log(this.userEmail);
        this.membersService.saveReview(record);
        this.alertMessage = "Thanks for your feedback!";
        this.presentAlert(this.alertMessage);
        this.navCtrl.navigateForward('/home');
    }

    async presentAlert(alertMessage: string) {

            console.log("called function presentAlert in reviews");
            const alert = await this.alertController.create({
              header: 'Alert',
              subHeader: '',
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