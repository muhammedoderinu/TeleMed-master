import { PatientService } from 'src/app/services/patient.service';
import { User } from './../../models/user.model';
import { NavBarService } from './../../services/nav-bar.service';
import { Component, Input, OnInit } from '@angular/core';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']

})
export class NavbarComponent implements OnInit {
  user!:any
  initials!:any
  
  constructor(private navbarService:NavBarService, private patientService: PatientService) { }

  ngOnInit(): void {
    this.patientService.getPatientFromServer()
    .then((res) =>{
      this.user = res
      console.log('nav', this.user)
      this.initials = this.user.username.charAt(0)
    })
   
  }
  public gfg = true;


}
