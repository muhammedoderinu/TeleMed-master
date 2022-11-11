import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import {Observable} from 'rxjs'
import { Component, Input, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Select, Store } from '@ngxs/store';
import { UserSelectors } from 'src/app/selector/user.selector';
import axios from 'axios';
import { AddUser } from 'src/app/actions/user.actions';

@Component({
  selector: 'app-patientprofile',
  templateUrl: './patientprofile.component.html',
  styleUrls: ['./patientprofile.component.css']
})
export class PatientprofileComponent implements OnInit {
  
  closeResult = '';
  avatar_url = '';
  username = '';
  url!:string
  @Select(UserSelectors.userInfo)
  users$!: Observable<User[]>;


 

  constructor(private modalService: NgbModal, private store :Store, private route: Router) { }

  ngOnInit(): void {
    this.users$!.subscribe()
  }

  http = axios.create({
    baseURL: 'http://localhost:8000',
    headers:{
      'Content-Type': 'application/json',
      'X-Requested-With':'XMLHttpRequest',
    },
    withCredentials:true
  })

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

 

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

 async onSelectFile(event:any){
    const selectedFile = event.target.files[0]
    const fd = new FormData()
    fd.append('avatar', selectedFile, selectedFile.name)
    console.log(fd.get('avatar'))
    this.url=''
    
    await this.http.post('api/profile-store', fd, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => {
      if(response.status === 200){
        const username = response.data.user.username
        const avatar_url = response.data.user.avatar_url
        this.avatar_url = response.data.user.avatar_url
        const id = response.data.user.id
        this.username = response.data.user.username
        event = null
        
      }
    }).catch((error) => {

    })


  }

}
