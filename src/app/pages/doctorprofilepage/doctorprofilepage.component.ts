import { Store } from '@ngxs/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import {Location} from '@angular/common'
import { Doctor } from 'src/app/models/doctor.model';
import { AddDoctor } from 'src/app/actions/doctor.actions';

@Component({
  selector: 'app-doctorprofilepage',
  templateUrl: './doctorprofilepage.component.html',
  styleUrls: ['./doctorprofilepage.component.css']
})
export class DoctorprofilepageComponent implements OnInit {
  doctor!:Doctor

  constructor(private router: ActivatedRoute, private location:Location, private store:Store) { }


  ngOnInit(): void {
    const state:any = this.location.getState();
    this.doctor = state.data 
    console.log('dpp', state.data)
  }

//  getItem(){
//   this.router.paramMap.subscribe(params => {
//      console.log(this.item)
//   });
 
//  }


}
