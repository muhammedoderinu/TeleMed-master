import { Index } from './../../../models/index.model';
import { AddIndex } from './../../../actions/index.action';
import { DoctorList } from './../../../models/doctorlist.model';
import { Doctor } from './../../../models/doctor.model';
import { Observable } from 'rxjs';
import { Component, Input,Output, EventEmitter, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import axios from 'axios';
import { UserSelectors } from 'src/app/selector/user.selector';
import { DoctorDetailService} from '../../../services/doctordetail.service';
import { User } from 'src/app/models/user.model';
import { DoctorSelectors } from 'src/app/selector/doctor.selector';
import { AddDoctor } from 'src/app/actions/doctor.actions';



@Component({
  selector: 'app-doctorprofile',
  templateUrl: './doctorprofile.component.html',
  styleUrls: ['./doctorprofile.component.css']
})
export class DoctorprofileComponent implements OnInit {
  data!:any
  listOfDoctor!: Doctor[]
  doctor!:Doctor
  doctorCategories!:any

  @Output() valueChange = new EventEmitter();
    Counter = 0;

   


  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];

  personal:any
  starPercentageRounded:any
 

  ratings =4.7;
  starsTotal=5;
  

 

  constructor(private doctorDetailService:DoctorDetailService, private store: Store) {}

  ngOnInit(): void {
    this.getRatings()
    this.getDoctors() 
  }

  getDoctors(){
    this.doctorDetailService.getDoctorFromServer().then((res) => {
      this.listOfDoctor = res
    }) 
  }

  getCategories(){
    this.doctorDetailService.getDoctorCategoriesFromServer().then((res) =>{
      this.doctorCategories = res
    })
  }

  getIndex(index:number){
    this.store.dispatch(new AddIndex({index}))
  }

  getRatings(){
    let starPercentage = (this.ratings/this.starsTotal)*100;
    this.starPercentageRounded = `${Math.round(starPercentage/10)*10}%`;
    console.log(this.starPercentageRounded)
  }

  storeSelectedDoctor(doctor:Doctor){
    //this.doctorDetailService.storeSelectedDoctor(doctor)
    this.valueChange.emit(doctor)
  }

  onTableDataChange(event: any) {
    this.page = event;
   // this.doctor
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
   // this.doctor
  }

  

}
