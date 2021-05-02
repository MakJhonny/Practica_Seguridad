import { Injectable } from '@angular/core'; 
import { HttpClient  } from '@angular/common/http'; 
import firebase from 'firebase/app';
import "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class IpServiceService {

  constructor(
    private http:HttpClient

  ) { }

  public getIPAddress()  
  {  
    return this.http.get("http://api.ipify.org/?format=json");  
  }
  
  async saveInfo(user:any) {
    const db = firebase.firestore();
    // if (isNew) {
      const id = await db.collection("failed_signin_attemps").doc().id;
      user.id = id;
    // }
    await db.collection("failed_signin_attemps").doc(user.id).set({...user});
    
  }
}
