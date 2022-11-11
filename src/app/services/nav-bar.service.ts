import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {
  user!: User

  constructor(private storage:LocalStorageService) { }

  public retrievePatientFromStorage(){
    this.user = this.storage.retrieve('patient')
    return this.user
  }

}
