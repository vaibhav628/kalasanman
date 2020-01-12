import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(
    public firebaseNative: Firebase,
    public afs: AngularFirestore,
    private platform: Platform
  ) {
    console.log("inside FcmService constructor")
  }
  // Get permission from the user
  async getToken() {
    let token;
    console.log("inside FcmService getToken")
    if (this.platform.is('android')) {
      token = await this.firebaseNative.getToken()
    }

    if (this.platform.is('ios')) {
      token = await this.firebaseNative.getToken();
      await this.firebaseNative.grantPermission();
    }
		/*
		if(this.platform.is('desktop') || this.platform.is('mobileweb')) {
			token = "browser";
		}
		*/
    console.log("token:" + token);
    return this.saveTokenToFirestore(token)
  }

  // Save the token to firestore
  private saveTokenToFirestore(token) {
    console.log("inside FcmService saveTokenToFirestore")
    if (!token) {
      console.log("token is empty");
      return;
    }


    let ts = firebase.firestore.FieldValue.serverTimestamp();
    //let user = firebase.auth().currentUser.uid;
    const docData = {
      token: token,
      created: ts
    }
    console.log("saving token to firestore");
    try {
      const devicesRef = this.afs.collection('devices');
      return devicesRef.doc(token).set(docData);
    }
    catch (e) {
      console.log(e);
    }



  }

  // Listen to incoming FCM messages
  listenToNotifications() {
    console.log("inside FcmService listenToNotifications");
    return this.firebaseNative.onNotificationOpen();
  }

}
