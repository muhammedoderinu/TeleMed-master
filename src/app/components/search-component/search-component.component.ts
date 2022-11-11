import { Component, OnInit } from '@angular/core';
import { DoctorDetailService } from 'src/app/services/doctordetail.service';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.css']
})
export class SearchComponentComponent implements OnInit {
  doctorCategories!:any

  constructor(private doctorDetailService:DoctorDetailService) { }

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories(){
    this.doctorDetailService.getDoctorCategoriesFromServer().then((res) =>{
      this.doctorCategories = res
      console.log(this.doctorCategories[0].name)
    })
  }

}
