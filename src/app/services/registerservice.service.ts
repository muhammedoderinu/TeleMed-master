import { Injectable } from '@angular/core';
import { PersonalInfo } from '../components/Model/PersonalInfo';

@Injectable({
  providedIn: 'root'
})
export class RegisterserviceService {
 

  constructor() { }

  public getPersonalInfo(): PersonalInfo{
    var personalInfo = JSON.parse(localStorage.getItem('personalInfo') || '' ) as PersonalInfo;
    return personalInfo;
  }


  public setPersonalInfo( value:PersonalInfo){
    localStorage.setItem('personalInfo', JSON.stringify(value));
  }

 // public getFirstName():string{
    //return this.personalInfo.getFirstName();
  //}

  
}
