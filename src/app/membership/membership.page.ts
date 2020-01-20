import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { MembersService } from '../services/members.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.page.html',
  styleUrls: ['./membership.page.scss'],
})
export class MembershipPage implements OnInit {

  validations_form: FormGroup;
  userEmail: string;
  alertMessage: string;
  URL: string;

  constructor(

    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    private membersService: MembersService,
    public alertController: AlertController,
  ) { console.log("Membership constructor called");

  this.URL="https://www.hungamacity.com/membership/14/kalasanman-membership";

  }

  validation_messages = {
            'fname': [
                            { type: 'required', message: 'Name is required.' },
                            { type: 'minlength', message: 'Name must be at least 3 characters long.' },
                            { type: 'pattern', message: 'Enter valid name' },
                ],

            'cnumber': [
                            { type: 'required', message: 'Contact number is required.' },
                            { type: 'minlength', message: 'Enter phone number with area code' },
                            { type: 'maxlength', message: 'Enter phone number with area code' },
                            { type: 'pattern', message: 'Enter valid contact number' },
                 ],
            'age': [
                            { type: 'required', message: 'Age is required.' },
                            { type: 'minlength', message: 'Enter valid age group' },
                            { type: 'maxlength', message: 'Enter valid age group' },
                            { type: 'pattern', message: 'Enter valid age group' },
                 ],
            'art': [
                            { type: 'required', message: 'Art Preference is required.' },
                            { type: 'minlength', message: 'Enter comma separated Art preferences' },
                            { type: 'pattern', message: 'Enter valid preferences' },
                 ],
            'interests': [
                            { type: 'required', message: 'Interests Preference is required.' },
                            { type: 'minlength', message: 'Enter comma separated Interests preferences' },
                            { type: 'pattern', message: 'Enter valid preferences' },
                  ],
             'language': [
                            { type: 'required', message: 'Language Preference is required.' },
                            { type: 'minlength', message: 'Enter comma separated Language preferences' },
                            { type: 'pattern', message: 'Enter valid preferences' },
                  ],
            'email': [
                            { type: 'required', message: 'Email is required.' },
                            { type: 'pattern', message: 'Please enter a valid email.' }
                  ],
            'password': [
                            { type: 'required', message: 'Password is required.' },
                            { type: 'minlength', message: 'Password must be at least 5 characters long.' }
                  ],
            'address': [
                            { type: 'required', message: 'Address is required.' },
                            { type: 'minlength', message: 'Please enter valid address' },
                            { type: 'pattern', message: 'Please enter valid address' }
                  ]
        };

  ngOnInit(){

    if(this.authService.userDetails()){
      this.userEmail = this.authService.userDetails().email;
    }else{
      this.presentAlertNoButton("Please login to access this section!");
      this.navCtrl.navigateBack('/login');
    }

        this.validations_form = this.formBuilder.group({
        email: new FormControl('', Validators.compose([
                  Validators.required,
                  Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        password: new FormControl('', Validators.compose([
                  Validators.minLength(5),
                  Validators.required
        ])),
         fname: new FormControl('', Validators.compose([
                  Validators.minLength(3),
                  Validators.required,
                  Validators.pattern('^[a-zA-Z +-]+$')
         ])),
         cnumber: new FormControl('', Validators.compose([
                  Validators.minLength(10),
                  Validators.maxLength(10),
                  Validators.required,
                  Validators.pattern('^[0-9+-]+$')
         ])),
         age: new FormControl('', Validators.compose([
                  Validators.minLength(1),
                  Validators.maxLength(5),
                  Validators.required,
                  Validators.pattern('^[0-9+-]+[-]+[0-9+-]+$')
         ])),
         art: new FormControl('', Validators.compose([
                  Validators.minLength(3),
                  Validators.required,
                  Validators.pattern('^[a-zA-Z, +-]+$')
         ])),
         interests: new FormControl('', Validators.compose([
                  Validators.minLength(3),
                  Validators.required,
                  Validators.pattern('^[a-zA-Z, +-]+$')
         ])),
         language: new FormControl('', Validators.compose([
                  Validators.minLength(3),
                  Validators.required,
                  Validators.pattern('^[a-zA-Z, +-]+$')
         ])),
         address: new FormControl('', Validators.compose([
                  Validators.minLength(10),
                  Validators.required,
                  Validators.pattern('^[0-9+-]+[ a-zA-Z , +-]+[0-9+-]+$')
         ])),
      });
  }

  //addMember old version was adding data to firestore database
  //wrote new service writeUserData to write data to firebase realtime database
  addMember(record) {

    console.log(record);
    record.email = this.userEmail;
    console.log(this.userEmail);
    this.membersService.writeUserData(record);
    this.alertMessage = "Thank you. Would you like to pay your membership dues now?";
    this.presentAlert(this.alertMessage);
    this.navCtrl.navigateForward('/home');
  }

 logout(){
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
      this.navCtrl.navigateBack('');
    })
    .catch(error => {
      console.log(error);
    })
  }

     async presentAlertNoButton(alertMessage: string) {

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

    async presentAlert(alertMessage: string) {

      console.log("called function presentAlert in membership");
      const alert = await this.alertController.create({
        header: 'Confirm',
        subHeader: '',
        message: alertMessage,
        buttons:  [
                       {
                         text: 'Yes',
                         role: 'yes',
                         cssClass: 'secondary',
                         handler: (blah) => {
                           console.log('Confirm Yes: blah');
                           window.open("https://www.hungamacity.com/membership/14/kalasanman-membership");
                         }
                       }, {
                         text: 'No',
                         handler: () => {
                           console.log('Confirm No');
                         }
                       }
        ]
      });

      await alert.present();
    }


}