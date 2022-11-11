import { DoctorList } from './../models/doctorlist.model';
import { Injectable } from '@angular/core'
import { ɵInjectableAnimationEngine } from '@angular/platform-browser/animations'
import {State, Action, StateContext, Selector} from '@ngxs/store'
import { Doctor } from '../models/doctor.model'
import {AddDoctor} from './../actions/doctor.actions'
import { patch, append, removeItem, insertItem, updateItem } from '@ngxs/store/operators';
import { Index } from '../models/index.model';
import { AddIndex } from '../actions/index.action';

export class IndexStateModel{
    indexes!: Index[]
}

@State<IndexStateModel>({
    name: 'indexes',
    defaults: {
        indexes: []
    }
})

@Injectable()
export class IndexState{

    @Action(AddIndex)
    add(ctx: StateContext<IndexStateModel>, action:AddIndex){
        const{name} = action
        if(!name){
            return
        }
      
         const state = ctx.getState();

         const index: Index = {
            index: name.index
          
         }
         

        ctx.setState({
            ...state,
            indexes: [index],

           });
    
           console.log(ctx.getState());


    }
}