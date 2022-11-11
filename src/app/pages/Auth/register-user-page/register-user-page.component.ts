import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-register-user-page',
  templateUrl: './register-user-page.component.html',
  styleUrls: ['./register-user-page.component.css']
})
export class RegisterUserPageComponent implements OnInit {
  confirmPassword = ''
  regError = {
    'passwordError':'',
    'emailError': '',
    'firstNameError':'',
    'lastNameError':'',
    'phoneError':'',
    'userNameError':'',
  }
 

 userInfo = {
    'firstName': '',
    'lastName': '',
    'email': '',
    'phone': '',
    'password': '',
    'userName':''
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
  this.regError.passwordError = ''
  this.regError.emailError = ''
  this.regError.firstNameError = ''
  this.regError.lastNameError = ''
  this.regError.phoneError = ''
  this.regError.userNameError = ''
}


constructor(private router:Router) { }


async getUser() {
  this.reload()
  if(this.confirmPassword != this.userInfo.password){
   this.regError.passwordError = 'password does not match'
  }else{
    const csrf = await  this.http.get('/sanctum/csrf-cookie')
    this.http.post('/register',{
        'first_name': this.userInfo.firstName,
        'last_name' : this.userInfo.lastName,
        'email' : this.userInfo.email,
        'phone' : this.userInfo.phone,
        'password' : this.userInfo.password,
        'username' : this.userInfo.userName
    }).then((response) =>{
      if(response.status === 200){
        this.router.navigate(['/feed'], {queryParams: {order:'popular'}});
      }
    }).catch((error) => {
     const registrationErrors = error.response.data.errors
     if(registrationErrors.email){
      this.regError.emailError = registrationErrors.email[0]
    }
    if(registrationErrors.password){
      this.regError.passwordError = registrationErrors.password[0]
    }
    if(registrationErrors.first_name){
      this.regError.firstNameError = registrationErrors.first_name[0]
    }

    if(registrationErrors.last_name){
      this.regError.lastNameError =  registrationErrors.last_name[0]
    }
    if(registrationErrors.phone){
      this.regError.phoneError = registrationErrors.phone[0]
    }

    if(registrationErrors.userName){
     this.regError.userNameError = registrationErrors.userName[0]
    
    }
   
    
    })

  }

 
}



 

  ngOnInit(): void {
  }

}
