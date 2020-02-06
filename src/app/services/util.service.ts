import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class Utils {
  options: InAppBrowserOptions = {
    location: 'yes',//Or 'no'
    hidden: 'no', //Or  'yes'
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom: 'yes',//Android only ,shows browser zoom controls
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no', //Android only
    closebuttoncaption: 'Close', //iOS only
    disallowoverscroll: 'no', //iOS only
    toolbar: 'yes', //iOS only
    enableViewportScale: 'no', //iOS only
    allowInlineMediaPlayback: 'no',//iOS only
    presentationstyle: 'pagesheet',//iOS only
    fullscreen: 'yes',//Windows only
  };
  constructor(private theInAppBrowser: InAppBrowser){}
  
   openWithSystemBrowser(url: string) {
    let target = "_system";
    this.theInAppBrowser.create(url, target, this.options);
  }
   openWithInAppBrowser(url: string) {
    let target = "_blank";
    this.theInAppBrowser.create(url, target, this.options);
  }
   openWithCordovaBrowser(url: string) {
    let target = "_self";
    this.theInAppBrowser.create(url, target, this.options);
  }
}
