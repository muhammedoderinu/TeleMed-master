import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import  axios from 'axios';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  userInfo = {
    'email':'',
    'password':''
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  http = axios.create({
    baseURL: 'http://localhost:8000',
    headers:{
      'Content-Type': 'application/json',
      'X-Requested-With':'XMLHttpRequest',
    },
    withCredentials: true
  })

  getValue(event: Event): any {
    return (event.target as HTMLInputElement).value;
  }

    getUser(){
    this.http.get('/sanctum/csrf-cookie').then(response => {
      
      this.http.post('api/login-user', {

        'email': this.userInfo.email,
        'password': this.userInfo.password
      }).then((response) => {
        if(response.status === 200){
          const user = response.data.data
          const token  = response.data.token
          console.log('token', token)
          this.router.navigate(['/feed']);
        }
      })
  });
    

    
  }



}
