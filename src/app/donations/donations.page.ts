import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { MembersService } from '../services/members.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.page.html',
  styleUrls: ['./donations.page.scss'],
})
export class DonationsPage implements OnInit {

    validations_form: FormGroup;
    userEmail: string;
    alertMessage: string;

    constructor(

      private navCtrl: NavController,
      private authService: AuthenticateService,
      private formBuilder: FormBuilder,
      private membersService: MembersService,
      public alertController: AlertController,
    ) { console.log("Donation constructor called");}

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
              'femail': [
                      { type: 'required', message: 'Email is required.' },
                      { type: 'pattern', message: 'Please enter a valid email.' }
                    ],
          };

    ngOnInit(){

      // In old version, login was mandatory but it removed now

      //if(this.authService.userDetails()){
      //  this.userEmail = this.authService.userDetails().email;
      //}else{
      //  this.presentAlert("Please login to access this section!");
      //  this.navCtrl.navigateBack('/login');
      //}

          this.validations_form = this.formBuilder.group({
          femail: new FormControl('', Validators.compose([
            Validators.required,
            Validators.pattern('[A-Za-z0-9._%+-]{2,}@[a-zA-Z-_.]{2,}[.]{1}[a-zA-Z]{2,}')
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
        });
 }

    // Calling service to save donations requests
    saveDonationInterest(record) {

      console.log("In saveDonationInterest");
      console.log(record);
      record.email = this.userEmail;
      console.log(this.userEmail);
      this.membersService.saveDonationInterest(record);
      this.alertMessage = "Thanks for your interest in helping KalaSanman. We will get in touch!!!";
      this.presentAlert(this.alertMessage);
      this.navCtrl.navigateForward('/base/home');
    }

    zelleAlert() {
    console.log("In zelleAlert");
    this.alertMessage = "Please Zelle your donations to KalaSanman Zelle ID kalasanmancincy@gmail.com. Thank You!";
    this.presentAlert(this.alertMessage);
    }

    checkAlert() {
    this.alertMessage = "Please make your check payable to Treasurer, KalaSanman and send it to 6025 Glennshire Ct West Chester OH 45069. Thank You!";
    this.presentAlert(this.alertMessage);
    }

    async presentAlert(alertMessage: string) {

        console.log("called function presentAlert in donation");
        const alert = await this.alertController.create({
          header: 'Alert',
          subHeader: '',
          message: alertMessage,
          buttons: ['OK']
        });

        await alert.present();
      }
}
