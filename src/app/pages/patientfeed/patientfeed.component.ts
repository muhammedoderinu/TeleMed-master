import { DoctorDetailService } from './../../services/doctordetail.service';
import { LocalStorageService } from 'ngx-webstorage';
import { Doctor } from './../../models/doctor.model';
import { DoctorList } from './../../models/doctorlist.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AddUser } from 'src/app/actions/user.actions';
import axios from 'axios';
import { User } from 'src/app/models/user.model';
import { AddDoctor } from 'src/app/actions/doctor.actions';
import { PatientService } from 'src/app/services/patient.service';



@Component({
  selector: 'app-patientfeed',
  templateUrl: './patientfeed.component.html',
  styleUrls: ['./patientfeed.component.css']
})



export class PatientfeedComponent implements OnInit {
  doctor!:Doctor
  patient!:User
  initials!:string
  doctors!:Doctor[]
  constructor(private patientService:PatientService, private doctorDetailService:DoctorDetailService) { }

  ngOnInit(): void {
    
  }

  insertDoctor(event:any){
    this.doctor = event
    this.initials = this.doctor.user.username.charAt(0)
  }

 

}
