import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-register-doctor',
  templateUrl: './register-doctor.component.html',
  styleUrls: ['./register-doctor.component.css']
})
export class RegisterDoctorComponent implements OnInit {

  confirmPin = ''
  regError = {
    'pinError':'',
    'AOSError': '',
  }
 

 userInfo = {
    'AOS': '',
    'pin': '',
  }; 


  getValue(event: Event): any {
    return (event.target as HTMLInputElement).value;
  }

http = axios.create({
  baseURL: 'http://localhost:8000',
  headers:{
    'X-Requested-With':'XMLHttpRequest',
  },
  withCredentials:true
})

  reload(){
    this.regError.pinError = ''
    this.regError.AOSError = ''
   
  }
  

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  async getUser() {
    this.reload()
    if(this.confirmPin != this.userInfo.pin){
     this.regError.pinError = 'password does not match'
    }else{
      const csrf = await  this.http.get('/sanctum/csrf-cookie')
      this.http.post('api/register-doctor',{
          'specialization': this.userInfo.AOS,
          'pin' : this.userInfo.pin,
      }).then((response) =>{
        if(response.status === 200){
          this.router.navigate(['/doctorfeed']);
        }
       
      }).catch((error) => {
        if(error.response.status===302){
          console.log('message', error.response.data.message)
        }
       const registrationErrors = error.response.data.errors
       if(registrationErrors.specialization){
        this.regError.AOSError = registrationErrors.specialization[0]
      }
      if(registrationErrors.pin){
        this.regError.pinError = registrationErrors.pin[0]
      }
      })
  
    }
  
   
  }

}
