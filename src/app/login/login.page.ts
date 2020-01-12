import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { AlertController } from '@ionic/angular';
import { Events } from '@ionic/angular';


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
  successMessage: string = " ";
  passwordType: string = 'password';
  passwordShown: boolean = false;
  eyeColor: string  = 'gray';

  constructor(

    private navCtrl: NavController,
    private authService: AuthenticateService,
    public events: Events,
    private formBuilder: FormBuilder,
    public alertController: AlertController,

  ) { }
  /*
      ionViewDidLoad(){

                this.events.publish('loggedin');
           }
  */
  ngOnInit() {

    //this.myErrorMessage = " ";

    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
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
      { type: 'minlength', message: 'Minimum 6 characters please' }
    ]
  };

  loginUser(value) {

    /*console.log(value.email);
    console.log(value.password);
    */
    this.authService.loginUser(value)
      .then(res => {
        console.log(res);
        this.events.publish('loggedin');
        this.errorMessage = "";
        this.navCtrl.navigateForward('/membership');
      }, err => {
        this.errorMessage = err.message;
        this.alertMessage = err.message;
        console.log(err);
        this.presentAlert(err.message);
      })
  }
  goToRegisterPage() {
    this.navCtrl.navigateForward('/register');
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


  resetPassword(value) {
    console.log("called function resetPassword");

    if (typeof value.email != 'undefined' && value.email) {
      this.authService.resetPassword(value.email);
      this.alertMessage = "Email is sent to reset password."
      this.presentAlert(this.alertMessage);
    }
    else {
      this.alertMessage = "Enter valid email address."
      this.presentAlert(this.alertMessage);
    }
  }

  tryRegister(value) {
    this.authService.registerUser(value)
      .then(res => {
        console.log(res);
        this.errorMessage = "";
        this.successMessage = "Your account has been created. Please log in.";
        this.presentAlert(this.successMessage);

        //this.goLoginPage();
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.presentAlert(this.errorMessage);
        this.successMessage = "";
      })
  }
  ionViewDidLoad() {
    this.passwordShown = false;
    this.passwordType = 'password';
    this.eyeColor = 'gray';
  }
  public togglePassword() {
    if (this.passwordShown) {
      this.passwordShown = false;
      this.passwordType = 'password';
      this.eyeColor = 'gray';
    } else {
      this.passwordShown = true;
      this.passwordType = 'text';
      this.eyeColor = 'dark';
    }
  }
}
