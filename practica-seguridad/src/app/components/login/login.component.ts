import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email =''; 
  password='';
  isLogged: boolean = true;
  attemps=0;  
  
  constructor(
    public authenticationService: AuthenticationService,
    public router: Router, 
    public route: ActivatedRoute 
  ) {}

  ngOnInit(): void {
    this.authenticationService.logout();
    this.attemps = 5; 
  }

  async login(){
    await this.authenticationService.login(this.email, this.password);
    this.isLogged = this.authenticationService.isLoggedIn();
  
    if(this.isLogged){
      this.goToHome();
    }
    else if(this.isLogged == false){
      this.attemps = this.attemps -1; 
    }
    
  }

  goToHome(){
    this.router.navigate(["/"]);   ///home
  }


}
