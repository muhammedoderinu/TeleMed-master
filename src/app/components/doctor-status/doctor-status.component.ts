import { User } from './../../models/user.model';
import { PatientService } from 'src/app/services/patient.service';
import { DoctorDetailService } from './../../services/doctordetail.service';
import { DoctorStatusService } from './../../services/doctor-status.service';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { Index } from './../../models/index.model';
import { Component,Input, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {Observable} from 'rxjs'
import { AddDoctor } from 'src/app/actions/doctor.actions';
import { DoctorList } from 'src/app/models/doctorlist.model';
import { IndexSelectors } from 'src/app/selector/index.selector';
import { DoctorSelectors } from 'src/app/selector/doctor.selector';
import { Doctor } from 'src/app/models/doctor.model';
import {LocalStorageService} from 'ngx-webstorage';
import { Consultee } from 'src/app/models/consultee.model';

@Component({
  selector: 'app-doctor-status',
  templateUrl: './doctor-status.component.html',
  styleUrls: ['./doctor-status.component.css']
})
export class DoctorStatusComponent implements OnInit {
 @Input() doctor!:Doctor
 @Input() initials!:string
 user!:User


  
  constructor( private store: Store,  private route:Router, private doctorDetailService:DoctorDetailService, private patientService:PatientService) { 
   
  }

  routeToChat(){
    this.route.navigate(['/chat'])
  }
  
  ngOnInit(): void {
    console.log('hey')
    if(this.doctor){
      this.initials = this.doctor.user.username.charAt(0)
    }
      this.doctorDetailService.getDoctorFromServer()
      .then((res) => {
        const doctors = res
        this.doctor = doctors[0]
        this.initials = this.doctor.user.username.charAt(0)
        console.log('res',res)
      })
      this.patientService.getPatientFromServer()
    .then((res) =>{
      this.user = res
      console.log('nav', this.user)
      this.initials = this.user.username.charAt(0)
    })
     
  }


  viewDoctor(){

  }

}
