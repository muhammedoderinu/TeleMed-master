import { Client } from '../models/client.model';
import { Chat } from './../models/chat.model';
import { DoctorList } from './../models/doctorlist.model';
import { Doctor } from "../models/doctor.model";

export class AddClient {
    static readonly type = '[ClientLIST] Add'
 
    constructor(public name: Client){
        
 
    }
 }