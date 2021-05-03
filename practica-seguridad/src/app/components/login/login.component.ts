import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service'
import { Router, ActivatedRoute } from '@angular/router';
import{IpServiceService} from '../../services/ip-service.service';
import { HttpClient  } from '@angular/common/http'; 


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email =''; 
  password='';
  isLogged: boolean = true;
  attemps=-1;
  ipAddress:string=''; 
  attempsExceded:boolean = false; 

  user: any = {
   id: "",
   ip: "",
   date:"",
   country:""
  };
  
  constructor(
    public authenticationService: AuthenticationService,
    public router: Router, 
    public route: ActivatedRoute,
    public ip: IpServiceService,
    private http:HttpClient 
  ) {}

  ngOnInit(): void {
    this.authenticationService.logout();
    this.attemps = 3; 
   
    this.user.ip = this.getIP(); 
    console.log(this.user.ip);
    console.log(typeof(this.user.ip));
   
  }

  async login(){
    await this.authenticationService.login(this.email, this.password);
    this.isLogged = this.authenticationService.isLoggedIn();
  
    if(this.isLogged){
      this.goToHome();
    }
    else if(this.isLogged == false){
      this.attemps = this.attemps -1; 
      this.attempsExceded = this.limitAttemps();
      if(this.attempsExceded){
        
        this.saveInfo(); 
      
        this.attemps = 3;
      }
    }
    
  }

  goToHome(){
    this.router.navigate(["/"]);   ///home
  }

  public getIPAddress()  
  {  
    console.log(this.http.get("http://api.ipify.org/"));
    return this.http.get("http://api.ipify.org/");  
     
  }  
  getIP()  
  {  
    this.ip.getIPAddress().subscribe((res:any)=>{  
      this.ipAddress=res.ip;  
    });  
  } 

  async saveInfo(){
  
    this.user.ip = this.ipAddress; 
    console.log(this.ipAddress);
    await this.ip.saveInfo(this.user); // Guarda en DB a traves del servicio 
  }

  limitAttemps(){
    return this.attemps == 0; 
  }




}
