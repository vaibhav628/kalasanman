import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
            title: 'Login',
            url: '/login',
            icon: 'key'
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

}
