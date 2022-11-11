import { Doctor } from './../models/doctor.model';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class DoctorStatusService {
  doctor!:Doctor

  constructor(private storage: LocalStorageService) { }

  public retrieveDoctorFromStorage(){
    this.doctor = this.storage.retrieve('doctor')
    return this.doctor
  }
}
