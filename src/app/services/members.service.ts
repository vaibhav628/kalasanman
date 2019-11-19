import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  //storage = firebase.storage();
  //storageRef = storage.ref();
  //var database = firebase.database();

  //key = database.getReference("quiz").push().getKey();

  constructor(private firestore: AngularFirestore) { }

  //this is for firestore database
  addMember(record){
        console.log("Entered addMember in service");
        return new Promise<any>((resolve, reject) => {
          this.firestore.collection('/test').add(record)
          .then(
            (res) => {
              resolve(res)
            },
            err => reject(err)
          )
        })
      }

      //this is for realtime database - saving donations interests
      saveDonationInterest(record) {
          firebase.database().ref('kalasanman/donations/' + record.fname ).set({
          fullname : record.fname,
          email : record.email,
          cnumber : record.cnumber

        });
     }

   //this is for realtime database
   writeUserData(record) {
       firebase.database().ref('kalasanman/members/' + record.fname ).set({
     //firebase.database().ref('kalasanman/events/PastPerformances/TATP/' ).set({
       fullname : record.fname,
       email : record.email,
       age : record.age,
       cnumber : record.cnumber,
       art : record.art,
       interests : record.interests,
       languages : record.language
     });
  }
}







