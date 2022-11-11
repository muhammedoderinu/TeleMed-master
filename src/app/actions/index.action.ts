import { DoctorList } from './../models/doctorlist.model';
import { Doctor } from "../models/doctor.model";
import { Index } from '../models/index.model';

export class AddIndex {
    static readonly type = '[INDEX] Add'
 
    constructor(public name: Index){
        
 
    }
 }