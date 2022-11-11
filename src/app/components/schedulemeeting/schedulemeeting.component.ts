import { Component, OnInit } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-schedulemeeting',
  templateUrl: './schedulemeeting.component.html',
  styleUrls: ['./schedulemeeting.component.css']
})
export class 
SchedulemeetingComponent implements OnInit {

  selected: Date | null | undefined;
  today = new Date();

 
  constructor() {
   
   }

  

  ngOnInit(): void {
  }

}
