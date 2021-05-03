import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service'
import { Router, ActivatedRoute } from '@angular/router';
import{IpServiceService} from '../../services/ip-service.service';
import { HttpClient  } from '@angular/common/http'; 
import * as moment from 'moment';
import { timeStamp } from 'node:console';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ɵNullViewportScroller } from '@angular/common';



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
  country:string=''; 
  attempsExceded:boolean = false; 
  coldown:any;
  times:any
  blockButtons:boolean = false;
  

  user: any = {
   id: "",
   ip: "",
   date:"",
   time:"",
   country:"",
   notShowing:false,
   coldown:"",
  };
  
  constructor(
    public authenticationService: AuthenticationService,
    public router: Router, 
    public route: ActivatedRoute,
    public ip: IpServiceService,
    private http:HttpClient 
  ) {}

  ngOnInit(): void {
      
    this.needToBlock();
    this.authenticationService.logout();
    this.attemps = 3;
    console.log(this.blockButtons);
   
    this.user.ip = this.getIP();
    this.times = new Date(); 
    this.user.date = this.times.toString();
    this.user.time = this.user.date.substr(15,16);

    this.getCountryName();

    
    // this.blockButtons = this.needToBlock(); 
   
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


        let coldown2 = new Date();
        this.coldown = new Date(coldown2.getTime()+60000).toString().substr(15,16); // 2 mins coldown
        this.user.coldown = this.coldown;
        console.log("COLDWON: ", this.coldown);
        this.user.notShowing = this.hasColdown();
        this.saveInfo(); 
        this.needToBlock();

      
        // this.attemps = 3;
      }
    }
    
  }

  goToHome(){
    this.router.navigate(["/home"]);   ///home
  }

  public getIPAddress()  
  {  
    console.log(this.http.get("http://api.ipify.org/"));
    return this.http.get("http://api.ipify.org/");  
     
  }
  public getCountry(){
    //return this.http.get("https://extreme-ip-lookup.com/json/")
    console.log(this.user.country);
    
  }  
  getIP()  
  {  
    this.ip.getIPAddress().subscribe((res:any)=>{  
      this.ipAddress=res.ip;  
    });  
  } 
  getCountryName(){
    this.ip.getCountry().subscribe((res:any)=>{  
      this.country=res.country; 
  });
  console.log(this.country);
  }

  async saveInfo(){
  
    this.user.ip = this.ipAddress;
    this.user.country = this.country; 
    console.log(this.ipAddress);
    await this.ip.saveInfo(this.user); // Guarda en DB a traves del servicio 
  }

  limitAttemps(){
    return this.attemps == 0; 
  }
  async needToBlock(){
    let block:boolean= false;
    let nowTime = new Date().toString().substr(15,16)
    console.log("Actual", nowTime);
    const forbiddenUsers = await this.ip.getForbiddenUsers();
    forbiddenUsers.forEach((user:any) => {
      if((user.ip == this.ipAddress) && (user.coldown > nowTime))
      block = true; 
      
    }); 
    this.blockButtons = block;
    return block;
  }

  hasColdown(){
    return this.coldown < this.user.time;
  }
  




}
