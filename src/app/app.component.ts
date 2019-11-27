import { Component } from '@angular/core';
import {Events} from '@ionic/angular';
import { AuthenticateService } from './services/authentication.service';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  showButton : any=false;  //will not show the log out button by default

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
            title: 'Login',
            url: '/login',
            icon: 'unlock'
    },
    {
            title: 'Membership',
            url: '/membership',
            icon: 'people'
    },
    {
            title: 'Events',
            url: '/events',
            icon: 'headset'
    },
    {
            title: 'Donations',
            url: '/donations',
            icon: 'logo-usd'
    },
    {
            title: 'About',
            url: '/about',
            icon: 'help-circle-outline'
    }
    ];

    constructor(
    public events : Events,
    private authService: AuthenticateService,
    ){
                    console.log("inside app component constructor");

                    // Listening for the event when the user has logged in
                    this.events.subscribe('loggedin', ()=>{
                          console.log("user logged in");
                          this.showButton = true      // will show the log out button now
                    });
     }

     logOut() {

            console.log("inside logout user");
            //console.log(value.email);
            //console.log(value.password);

            this.authService.logoutUser()
            .then(res => {
              console.log(res);
             // this.errorMessage = "";
              //this.navCtrl.navigateForward('home');
            }, err => {
              //this.errorMessage = err.message;
              //this.alertMessage = err.message;
              console.log(err);
              //this.presentAlert(err.message);
            })

         // this.navCtrl.navigateForward('/home');
     }

}
