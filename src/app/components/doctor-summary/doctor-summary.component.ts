import { Select, Store } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs'
import { DoctorList } from 'src/app/models/doctorlist.model';
import { AddDoctor } from 'src/app/actions/doctor.actions';
import { AddIndex } from 'src/app/actions/index.action';
import { DoctorSelectors } from 'src/app/selector/doctor.selector';
import { IndexSelectors } from 'src/app/selector/index.selector';
import { Index } from 'src/app/models/index.model';

@Component({
  selector: 'app-doctor-summary',
  templateUrl: './doctor-summary.component.html',
  styleUrls: ['./doctor-summary.component.css']
})
export class DoctorSummaryComponent implements OnInit {
  @Select(DoctorSelectors.doctorInfo)
  doctors$!: Observable<DoctorList[]>;

  @Select(IndexSelectors.indexInfo)
  indexes$!: Observable<Index[]>;


  constructor(private store: Store) { }
    

  ngOnInit(): void {
    this.doctors$.subscribe((data) => console.log('ok', data))

  }


}
