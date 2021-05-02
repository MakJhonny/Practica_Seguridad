import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  email =''; 
  password='';
  isLogged: boolean = true;  
  passwordLenght: boolean = true; 
  
  constructor(
    public authenticationService: AuthenticationService,
    public router: Router, 
    public route: ActivatedRoute 
  ) {}

  ngOnInit(): void {
    this.authenticationService.logout(); 
  }

  async createAccount(){
    this.passwordLenght = this.password != "" && (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).test(this.password);
    if(this.passwordLenght ){
      await this.authenticationService.crearCuenta(this.email, this.password);
      this.isLogged = this.authenticationService.isLoggedIn();
      if(this.isLogged){
        this.goToHome();
      }
    }
  
    
  
    
  }

  goToHome(){
    this.router.navigate(["/"]); // /home
  }

}
