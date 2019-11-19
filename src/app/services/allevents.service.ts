import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AlleventsService {

    events;

    // Get a reference to the database service
    // var database = firebase.database();

    constructor(private firestore: AngularFirestore) { }

    getPastPerformances() {

        var pastPerfRef = firebase.database().ref('/kalasanman/events/PastPerformances');

        console.log("Inside alleventservice getPastPerformances");
        //console.log(pastPerfRef);

        //return firebase.database().ref('/kalasanman/events/PastPerformances/TATP').once('value').then(function(snapshot) {
        //  var fullname = (snapshot.val() && snapshot.val().Author) || 'Anonymous';

        //return pastPerfRef.once('value').then(function(snapshot) {
        //var fullname = (snapshot.val() && snapshot.val().Name) || 'Anonymous';

         //console.log(fullname);

         return pastPerfRef.once('value', function(snapshot) {
           snapshot.forEach(function(childSnapshot) {
             var childKey = childSnapshot.key;
             var childData = childSnapshot.val();

             console.log(childKey);

             console.log(childData);

             // ...
           });
         });
   }

 }