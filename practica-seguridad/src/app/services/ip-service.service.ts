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
  public getCountry(){
    return this.http.get("https://extreme-ip-lookup.com/json/")
    
  } 
  
  async saveInfo(user:any) {
    const db = firebase.firestore();
    if (true) {
      const id = await db.collection("failed_signin_attemps").doc().id;
      user.id = id;
    }
    console.log(user.id);
    await db.collection("failed_signin_attemps").doc(user.id).set(user);
    
  }
  async getForbiddenUsers(){
    const db = firebase.firestore(); 

    return await db.collection("failed_signin_attemps").get().then(function(querySnapshot) {
    const forbidenUsers:any = []; 
    querySnapshot.forEach(function(doc) {
      forbidenUsers.push(doc.data()); 
    });
    return forbidenUsers 
});
}
}
