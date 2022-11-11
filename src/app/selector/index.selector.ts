import { DoctorStateModel } from './../state/doctor.state';
import { Injectable } from '@angular/core'
import {Selector} from '@ngxs/store';
import { IndexState, IndexStateModel } from '../state/index.state';
import { Index } from '../models/index.model';


@Injectable()
export class IndexSelectors{
@Selector([IndexState])
   static indexInfo(state:IndexStateModel): Index[] {
   
    console.log(state.indexes)
       return state.indexes
       

   }

}