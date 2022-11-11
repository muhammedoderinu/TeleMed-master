import { Injectable } from '@angular/core';
import axios from 'axios';
import { LocalStorageService } from 'ngx-webstorage';
import HTTPRequest from 'pusher-js/types/src/core/http/http_request';
import { Doctor } from '../models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorDetailService {
  listOfDoctors!:Doctor[]
  http = axios.create({
    baseURL: 'http://localhost:8000',
    headers:{
      'Content-Type': 'application/json',
      'X-Requested-With':'XMLHttpRequest',
    },
    withCredentials:true
})

  constructor(private storage:LocalStorageService) { }

  public getDoctorFromServer(){
    const responses = this.http.get('api/doctors')
      .then((response) =>{
        if(response.status === 200){
          console.log('response', response.data)
          return  response.data.doctors
        }
      })
    return responses
  }

  public getDoctorCategoriesFromServer(){
    const responses = this.http.get('api/doctor-categories')
    .then((response) => {
      if(response.status === 200){
        return response.data.categories
      }
    })
    return responses
  }

  public storeSelectedDoctor(doctor:Doctor){
    this.storage.store('doctor', doctor)
  }
}
