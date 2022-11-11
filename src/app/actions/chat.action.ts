import { Chat } from './../models/chat.model';
import { DoctorList } from './../models/doctorlist.model';
import { Doctor } from "../models/doctor.model";

export class AddChat {
    static readonly type = '[DOCTORLIST] Add'
 
    constructor(public name: Chat){
        
 
    }
 }