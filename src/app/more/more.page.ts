import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../services/authentication.service';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
})
export class MorePage implements OnInit {

  constructor(
   private authService: AuthenticateService,
   private navCtrl: NavController,
   private alertController: AlertController
  ) { }

  ngOnInit() {
  }

 // This method is moved from app.component.ts to here as Logout
 //functionality is moved under 'More' menu

  logOut() {

    var alertMessage = "";
    console.log("Inside more.page.ts.logout()");
    this.authService.logoutUser()
      .then(res => {
        console.log(res);
        alertMessage = "Logout successful";
        this.presentAlert(alertMessage);
      }, err => {
        console.log(err);
        this.presentAlert(err.message);
      })
    this.navCtrl.navigateForward('');
  }

  async presentAlert(alertMessage: string) {

    console.log("called function more.page.ts.presentAlert() with param");
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: '',
      message: alertMessage,
      buttons: ['OK']
    });
    await alert.present();
  }

  goToMembershipPage() {
       this.navCtrl.navigateForward('/base/more/join');
  }

   goToPurchasePage() {
           this.navCtrl.navigateForward('/base/more/purchase');
  }

  goToReviewsPage() {
       this.navCtrl.navigateForward('/base/more/reviews');
  }

  goToDonationsPage() {
         this.navCtrl.navigateForward('/base/more/donations');
    }

}
