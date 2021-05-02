import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import "firebase/auth";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  

  authStateChanged = new Subject<boolean>();
  constructor(

  ) {}

  initializeListener() {
    firebase.auth().onAuthStateChanged(user => {  //escuchar cambios
      this.authStateChanged.next(true);
    });
  }

  async login(email:any, password:any) {
    await firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(error =>{ // Necesario para el mensaje de error
      
    });
    
  }

  async logout() {
    await firebase.auth().signOut();
  }

  isLoggedIn() {
    const user = firebase.auth().currentUser;
    return Boolean(user);
    
  }

  async crearCuenta(email:any, password:any){
    await firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });
  }
}
