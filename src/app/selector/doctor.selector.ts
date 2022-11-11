import { DoctorStateModel } from './../state/doctor.state';
import { Injectable } from '@angular/core'
import {Selector} from '@ngxs/store';
import { UserState } from '../state/user.state';
import { User } from '../models/user.model';
import { DoctorState } from '../state/doctor.state';
import { DoctorList } from '../models/doctorlist.model';
import { Doctor } from '../models/doctor.model';


@Injectable()
export class DoctorSelectors{
@Selector([DoctorState])
   static doctorInfo(state:DoctorStateModel): Doctor[] {
   
    console.log(state.doctors)
       return state.doctors
       

   }

}