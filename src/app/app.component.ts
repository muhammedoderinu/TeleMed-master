import { Component, NgModule } from '@angular/core';
import {ChatService} from './services/chat.service'
import { FormsModule } from '@angular/forms';
import { DoctorDetailService } from './services/doctordetail.service';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ChatService, DoctorDetailService]
})
export class AppComponent {
  title = 'doctor-who';
 
  }

