import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import "firebase/firestore";
import { IpServiceService } from './services/ip-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:string = 'practica-seguridad';
  ipAddress:string='';
  
  constructor(
    private ip:IpServiceService

  ){}
 
  async ngOnInit() {
    await this.initFirebase();
    this.getIP(); 
  }

  getIP()  
  {  
    this.ip.getIPAddress().subscribe((res:any)=>{  
      this.ipAddress=res.ip;  
    });  
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
