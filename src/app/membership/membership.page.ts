import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { MembersService } from '../services/members.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.page.html',
  styleUrls: ['./membership.page.scss'],
})
export class MembershipPage implements OnInit {

  validations_form: FormGroup;
  userEmail: string;

  constructor(

    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    private membersService: MembersService
  ) { console.log("Membership constructor called");}

  validation_messages = {
            'fname': [
                { type: 'required', message: 'First name is required.' },
                { type: 'minlength', message: 'First Name must be at least 3 characters long.' },
                { type: 'pattern', message: 'Enter valid first name' },
              ],

            'cnumber': [
                            { type: 'required', message: 'Contact number is required.' },
                            { type: 'minlength', message: 'Enter phone number with area code' },
                            { type: 'maxlength', message: 'Enter phone number with area code' },
                            { type: 'pattern', message: 'Enter valid contact number' },
                    ],
            'age': [
                            { type: 'required', message: 'Age is required.' },
                            { type: 'minlength', message: 'Enter valid age' },
                            { type: 'maxlength', message: 'Enter valid age' },
                            { type: 'pattern', message: 'Enter valid age' },
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
                  ]
        };

  ngOnInit(){

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
                  Validators.maxLength(2),
                  Validators.required,
                  Validators.pattern('^[0-9+-]+$')
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
      });

  }

  addMember(record) {

    console.log(record);
    record.email = this.userEmail;
    console.log(this.userEmail);
    this.membersService.writeUserData(record);
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
}