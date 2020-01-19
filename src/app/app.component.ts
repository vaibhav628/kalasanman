import { Component } from '@angular/core';
import { Events } from '@ionic/angular';
import { AuthenticateService } from './services/authentication.service';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

/* added to support FCM push notifications*/
import { FcmService } from './services/fcm.service'
import { ToastController } from '@ionic/angular';
import { tap } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {


  showButton: any = false;  //will not show the log out button by default

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
      title: 'Interests',
      url: '/membership',
      icon: 'videocam'
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
          title: 'Membership & Tickets',
          url: '/purchase',
          icon: 'basket'
    },
    {
      title: 'About',
      url: '/about',
      icon: 'help-circle-outline'
    }
  ];

  constructor(
    public events: Events,
    private authService: AuthenticateService,
    private alertController: AlertController,
    private navCtrl: NavController,
    public menuCtrl: MenuController,
    /* added to support FCM push notifications*/
    private fcm: FcmService,
    private toastCtrl: ToastController,
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
  ) {
    console.log("inside app component constructor");
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    })
    // Listening for the event when the user has logged in
    this.events.subscribe('loggedin', () => {
      console.log("user logged in");
      this.showButton = true      // will show the log out button now
      /* added to support FCM push notifications*/
      this.initializeApp();
    });

  }

  initializeApp() {
    console.log("inside initializeApp");
    let toast
    // Get a FCM token
    this.fcm.getToken()

    // Listen to incoming messages
    this.fcm.listenToNotifications().pipe(
      tap(msg => {
        // show a toast
        toast = this.toastCtrl.create({
          message: msg.body,
          duration: 3000
        });
        toast.present();
      })
    )
      .subscribe()
  }

  logOut() {

    var alertMessage = "";
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
