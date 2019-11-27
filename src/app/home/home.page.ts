import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  //articles;
  //constructor(private apiService: ApiService){}
    constructor(public alertController: AlertController){}
  //ionViewDidEnter(){

    //this.apiService.getNews().subscribe((data)=>{
    //  console.log(data);
    //  this.articles = data['articles'];
    //});
  //}

  alertEmailAddress(){
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

}


