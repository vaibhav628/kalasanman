import { Injectable } from "@angular/core";
import * as firebase from 'firebase/app';

@Injectable()
export class AuthenticateService {

  constructor(){}

  registerUser(value){
   return new Promise<any>((resolve, reject) => {
     firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err))
   })
  }

  loginUser(value){
    console.log("called function loginUser in authentication service");
   return new Promise<any>((resolve, reject) => {
     firebase.auth().signInWithEmailAndPassword(value.email, value.password)
     //firebase.auth().signInWithEmailAndPassword('1@2.com', 'test123')
     .then(
       res => resolve(res),
       err => reject(err))
   })
  }

  logoutUser(){
    console.log("Inside authentication.service.logoutUser()");
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        firebase.auth().signOut()
        .then(() => {
          console.log("Log Out");
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    })
  }

  userDetails(){
    return firebase.auth().currentUser;
  }

  resetPassword(email: string) {
    var auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
      .then(() => console.log("email sent"))
      .catch((error) => console.log(error))
  }

}