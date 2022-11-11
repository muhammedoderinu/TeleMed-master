import { DoctorList } from './../models/doctorlist.model';
import { Injectable } from '@angular/core'
import { ɵInjectableAnimationEngine } from '@angular/platform-browser/animations'
import {State, Action, StateContext, Selector} from '@ngxs/store'
import { Doctor } from '../models/doctor.model'
import {AddDoctor} from './../actions/doctor.actions'
import { patch, append, removeItem, insertItem, updateItem } from '@ngxs/store/operators';

export class DoctorStateModel{
    doctors!: Doctor[]
}

@State<DoctorStateModel>({
    name: 'doctors',
    defaults:{
        doctors :[]
    }
   
})

@Injectable()
export class DoctorState{

    @Action(AddDoctor)
    add(ctx: StateContext<DoctorStateModel>, action:AddDoctor){
        const{name} = action
        if(!name){
            return
        }
      
         const state = ctx.getState();

         const doctor: Doctor = {
            specialization: name.specialization,
            id:name.id,
            updated_at: name.updated_at,
            created_at: name.created_at,
            user: name.user
          
         }
         

        ctx.setState({
            ...state,
            doctors: [doctor],

           });
    
           console.log(ctx.getState());


    }

  // @Action(ChangeDoctorState)
  // extractDoctor(ctx: StateContext<DoctorStateModel>, action: ChangeDoctorState) {
  //   ctx.setState(
  //     patch<DoctorStateModel>({
  //       doctors: updateItem<DoctorList>(
  //         name => name === action.payload.name,
  //         action.payload.newName
  //       )
  //     })
  //   );
  // }
}



