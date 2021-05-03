import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service'
import { Router, ActivatedRoute } from '@angular/router';
import { IpServiceService } from '../../services/ip-service.service';
import { HttpClient } from '@angular/common/http';
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

  email = '';
  password = '';
  isLogged: boolean = true;
  attemps = -1;
  ipAddress: string = '';
  attempsExceded: boolean = false;
  coldown: any;
  times: any;
  blockButtons: boolean = true;
  info: any = {
    businessName: "",
    businessWebsite: "",
    city: "",
    continent: "",
    country: "",
    countryCode: "",
    ipName: "",
    ipType: "",
    isp: "",
    lat: "",
    lon: "",
    org: "",
    query: "",
    region: "",
    status: ""
  };


  user: any = {
    id: "",
    ip: "",
    date: "",
    time: "",
    country: "",
    coldown: "",
    isp: "",
    publicIp: ""
  };

  constructor(
    public authenticationService: AuthenticationService,
    public router: Router,
    public route: ActivatedRoute,
    public ip: IpServiceService,
    private http: HttpClient
  ) { }

  async ngOnInit() {
    await Promise.all([
    this.getIP(),
    this.needToBlock()
    ]);
    this.authenticationService.logout();
    this.attemps = 3;
    console.log(this.blockButtons);

  }

  async login() {
    await this.authenticationService.login(this.email, this.password);
    this.isLogged = this.authenticationService.isLoggedIn();

    if (this.isLogged) {
      this.goToHome();
    }
    else if (this.isLogged == false) {
      this.attemps = this.attemps - 1;
      this.attempsExceded = this.limitAttemps();

      if (this.attempsExceded) {
        this.saveInfo();
        this.needToBlock();
      }
    }
  }
  
  goToHome() {
    this.router.navigate(["/home"]);
  }

  public getIPAddress() {
    console.log(this.http.get("http://api.ipify.org/"));
    return this.http.get("http://api.ipify.org/");

  }
  getIP()  
  {  
    this.ip.getIPAddress().subscribe((res:any)=>{  
      this.ipAddress=res.ip;  
    });  
  } 

  async saveInfo() {
    this.info = await this.ip.getInfo().toPromise();
    let coldown2 = new Date();
    let coldown = new Date(coldown2.getTime() + 60000).toString().substr(15, 16); // 1 min coldown

    this.user.country = this.info.country,
    this.user.ip= this.info.query,
    this.user.publicIp= this.info.ipName,
    this.user.date = coldown2.toString(),
    this.user.time = coldown2.toString().substr(15, 16),
    this.user.continent=  this.info.continent,
    this.user.city = this.info.city,
    this.user.coldown =coldown,
    this.user.isp = this.info.isp
    
    
    await this.ip.saveInfo(this.user); // Guarda en DB a traves del servicio 
  }

  limitAttemps() {
    return this.attemps == 0;
  }
  async needToBlock() {
    let block: boolean = false;
    let nowTime = new Date().toString().substr(15, 16)
    
    const forbiddenUsers = await this.ip.getForbiddenUsers();
    forbiddenUsers.forEach((user: any) => {
      if ((user.ip == this.ipAddress) && (user.coldown > nowTime))
        block = true;

    });
    this.blockButtons = block;
    return block;
  }
}
