import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  options : InAppBrowserOptions = {
      location : 'yes',//Or 'no'
      hidden : 'no', //Or  'yes'
      clearcache : 'yes',
      clearsessioncache : 'yes',
      zoom : 'yes',//Android only ,shows browser zoom controls
      hardwareback : 'yes',
      mediaPlaybackRequiresUserAction : 'no',
      shouldPauseOnSuspend : 'no', //Android only
      closebuttoncaption : 'Close', //iOS only
      disallowoverscroll : 'no', //iOS only
      toolbar : 'yes', //iOS only
      enableViewportScale : 'no', //iOS only
      allowInlineMediaPlayback : 'no',//iOS only
      presentationstyle : 'pagesheet',//iOS only
      fullscreen : 'yes',//Windows only
};
  //articles;
  //constructor(private apiService: ApiService){}
  constructor(public alertController: AlertController, private theInAppBrowser: InAppBrowser) {

  }

  //ionViewDidEnter(){

  //this.apiService.getNews().subscribe((data)=>{
  //  console.log(data);
  //  this.articles = data['articles'];
  //});
  //}

  alertEmailAddress() {
    this.presentAlert("Please write to us @ KalaSanmanCincy@gmail.com")
  }

  async presentAlert(alertMessage: string) {

    console.log("called function presentAlert in membership");
    const alert = await this.alertController.create({
      header: 'Information:',
      subHeader: '',
      message: alertMessage,
      buttons: ['OK']
    });

    await alert.present();
  }
  public openWithSystemBrowser(url : string){
      let target = "_system";
      this.theInAppBrowser.create(url,target,this.options);
  }
  public openWithInAppBrowser(url : string){
      let target = "_blank";
      this.theInAppBrowser.create(url,target,this.options);
  }
  public openWithCordovaBrowser(url : string){
      let target = "_self";
      this.theInAppBrowser.create(url,target,this.options);
  }  
}
