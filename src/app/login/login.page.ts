import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = " ";
  myErrorMessage: string = " ";
  alertMessage: string = " ";

  constructor(

    private navCtrl: NavController,
    private authService: AuthenticateService,

    private formBuilder: FormBuilder,
    public alertController: AlertController,

    ) { }

  ngOnInit() {

      //this.myErrorMessage = " ";

      this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };

  loginUser(value){

    console.log(value.email);
    console.log(value.password);

    this.authService.loginUser(value)
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      this.navCtrl.navigateForward('/membership');
    }, err => {
      this.errorMessage = err.message;
      this.alertMessage = err.message;
      console.log(err);
      this.presentAlert();
    })
  }
  goToRegisterPage(){
    this.navCtrl.navigateForward('/register');
  }

  async presentAlert() {

    console.log("called function presentAlert");
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: '',
      //message: this.errorMessage,
      message: this.alertMessage,
      buttons: ['OK']
    });

    await alert.present();
  }

   resetPassword(value) {
     console.log("called function resetPassword");
     this.authService.resetPassword(value.email);
     this.alertMessage = "Email is sent to reset password."
     this.presentAlert();
   }
}
