import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-patientprofilepage',
  templateUrl: './patientprofilepage.component.html',
  styleUrls: ['./patientprofilepage.component.css']
})
export class PatientprofilepageComponent implements OnInit {
  patientProfile = {'first_name':'','last_name':'','avatarUrl':'','headerUrl':'','username':''}

  constructor(private route:Router) { }

  http = axios.create({
    baseURL: 'http://localhost:8000',
    headers:{
      'Content-Type':'application/json',
      'X-Requested-With':'XMLHttpRequest'
    },
    withCredentials:true
  })

  getUserProfile(){
   this.http.get('/api/profile').
   then((response) =>{
    if(response.status === 200){
     this.patientProfile = response.data.user
     console.log(response.data.user)
    }
   }).catch((error) => {
    this.route.navigate(['/login'])
       
         
   });
    
  }

  ngOnInit(): void {
    this.getUserProfile();
  }

}
