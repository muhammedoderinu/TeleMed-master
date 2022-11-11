import { NotificationPageComponent } from './pages/notification-page/notification-page.component';
import { InitialChatComponent } from './pages/initial-chat/initial-chat.component';
import { RegisterDoctorComponent } from './pages/Auth/Registration/register-doctor/register-doctor.component';
import { DoctorfeedComponent } from './pages/doctorfeed/doctorfeed.component';
import { PatientprofilepageComponent } from './pages/patientprofilepage/patientprofilepage.component';
import { PatientfeedComponent } from './pages/patientfeed/patientfeed.component';
import { DoctorprofileComponent } from './components/Feed/doctorprofile/doctorprofile.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatMessagePageComponent } from './pages/chat-message-page/chat-message-page.component';
import { VideoMenuPagesComponent } from './pages/video-menu-pages/video-menu-pages.component';


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DoctorInfoComponent } from './components/Feed/doctor-info/doctor-info.component';
import { LoginPageComponent } from './pages/Auth/login-page/login-page.component';
import { ChattingpageComponent } from './pages/chattingpage/chattingpage.component';
import { DoctorprofilepageComponent } from './pages/doctorprofilepage/doctorprofilepage.component';
import { SchedulemeetingpageComponent } from './pages/schedulemeetingpage/schedulemeetingpage.component';
import { VideoStreamingPageComponent } from './pages/video-streaming-page/video-streaming-page.component';
import { RegisterUserPageComponent } from './pages/Auth/register-user-page/register-user-page.component';



const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path:'feed', component: PatientfeedComponent},
  {path:'home', component: HomepageComponent},
  {path:'login', component:LoginPageComponent},
  {path:'chat', component:ChattingpageComponent},
  {path:'chat-message', component:ChatMessagePageComponent},
  {path:'chat-room', component:InitialChatComponent},
  {path:'doctorprofile', component:DoctorprofileComponent},
  {path:'patientprofile', component:PatientprofilepageComponent},
  {path:'doctorinfo', component:DoctorInfoComponent},
  {path:'doctorprofilepage', component:DoctorprofilepageComponent},
  {path:'doctorfeed', component:DoctorfeedComponent},
  {path:'schedulemeeting', component:SchedulemeetingpageComponent},
  {path:'videostream', component:VideoStreamingPageComponent},
  {path:'video-menu', component:VideoMenuPagesComponent},
  {path:'register-user', component:RegisterUserPageComponent},
  {path:'register-doctor', component:RegisterDoctorComponent},
  {path:'notification', component:NotificationPageComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
