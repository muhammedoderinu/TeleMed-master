import { Injectable } from '@angular/core';
import axios from 'axios';
import { LocalStorageService } from 'ngx-webstorage';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  listOfDoctors!:User[]
  http = axios.create({
    baseURL: 'http://localhost:8000',
    headers:{
      'Content-Type': 'application/json',
      'X-Requested-With':'XMLHttpRequest',
    },
    withCredentials:true
})

  constructor(private storage:LocalStorageService) { }

  public getPatientFromServer(){
    const responses = this.http.get('api/patient')
      .then((response) =>{
        if(response.status === 200){
          console.log('response', response.data.user)
          return response.data.user
        
        }
      })
      return responses
  }
}
