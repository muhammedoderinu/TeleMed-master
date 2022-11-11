import { DoctorList } from './../models/doctorlist.model';
import { Doctor } from "../models/doctor.model";

export class AddDoctor {
    static readonly type = '[DOCTORLIST] Add'
 
    constructor(public name: Doctor){
        
 
    }
 }



