import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.page.html',
  styleUrls: ['./membership.page.scss'],
})
export class MembershipPage implements OnInit {


  userEmail: string;

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(){

    validations_form: FormGroup;

    if(this.authService.userDetails()){
      this.userEmail = this.authService.userDetails().email;
    }else{
      this.navCtrl.navigateBack('');
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
                  Validators.pattern('^[a-zA-Z+-]+$')
         ])),
         lname: new FormControl('', Validators.compose([
                  Validators.minLength(3),
                  Validators.required,
                  Validators.pattern('^[a-zA-Z+-]+$')
         ])),
         cnumber: new FormControl('', Validators.compose([
                           Validators.minLength(10),
                           Validators.maxLength(10),
                           Validators.required,
                           Validators.pattern('^[0-9+-]+$')
                  ])),
      });

  }

  validation_messages = {
      'fname': [
          { type: 'required', message: 'First name is required.' },
          { type: 'minlength', message: 'First Name must be at least 3 characters long.' },
          { type: 'pattern', message: 'Enter valid first name' },
        ],
      'lname': [
                { type: 'required', message: 'Last name is required.' },
                { type: 'minlength', message: 'Last Name must be at least 3 characters long.' },
                { type: 'pattern', message: 'Enter valid last name' },
        ],
      'cnumber': [
                      { type: 'required', message: 'Contact number is required.' },
                      { type: 'minlength', message: 'Enter phone number with area code' },
                      { type: 'maxlength', message: 'Enter phone number with area code' },
                      { type: 'pattern', message: 'Enter valid contact number' },
              ],

      'email': [
              { type: 'required', message: 'Email is required.' },
              { type: 'pattern', message: 'Please enter a valid email.' }
            ],
            'password': [
              { type: 'required', message: 'Password is required.' },
              { type: 'minlength', message: 'Password must be at least 5 characters long.' }
            ]
  };

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
}