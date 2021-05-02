import { Component } from '@angular/core';
import firebase from 'firebase/app';
import "firebase/firestore";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'practica-seguridad';
  
  constructor(

  ){}

  async ngOnInit() {
    await this.initFirebase();
  }

  async initFirebase() {
    const firebaseConfig = {
      apiKey: "AIzaSyAAB7GCyvmxqcepDhLWzOsIY3k056zmO6U",
      authDomain: "practica-seguridad.firebaseapp.com",
      projectId: "practica-seguridad",
      storageBucket: "practica-seguridad.appspot.com",
      messagingSenderId: "356103873271",
      appId: "1:356103873271:web:8f8e4945f9981cc77969f2"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
