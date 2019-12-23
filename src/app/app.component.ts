import { Component } from '@angular/core';
import {Events} from '@ionic/angular';
import { AuthenticateService } from './services/authentication.service';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

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
            title: 'Newsfeed',
            url: '/newsfeed',
            icon: 'globe'
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
                title: 'Reviews',
                url: '/reviews',
                icon: 'text'
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
    private alertController: AlertController,
    private navCtrl: NavController,
    public menuCtrl: MenuController
    ){
                    console.log("inside app component constructor");

                    // Listening for the event when the user has logged in
                    this.events.subscribe('loggedin', ()=>{
                          console.log("user logged in");
                          this.showButton = true      // will show the log out button now
                    });
     }

     logOut() {

            var alertMessage="";
            console.log("inside logout user");
            //console.log(value.email);
            //console.log(value.password);

            this.authService.logoutUser()
            .then(res => {
              console.log(res);
              alertMessage = "Logout successful";
              this.presentAlert(alertMessage);

              //this.navCtrl.navigateForward('home');
            }, err => {

              console.log(err);
              this.presentAlert(err.message);
            })
         this.menuCtrl.toggle();
         this.navCtrl.navigateForward('/home');
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


}
