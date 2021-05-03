import { Component, OnInit } from '@angular/core';
import{IpServiceService} from '../../services/ip-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  forbiddenUsers:any = []; 

  constructor(
    public ip: IpServiceService
  ) { }

  async ngOnInit() {
    this.forbiddenUsers = await this.ip.getForbiddenUsers(); 
  }

}
