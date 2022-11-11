import { AuthService } from 'ngx-auth';
import { ClientState } from './state/client.state';
import { MessageState } from './state/message.state';
import { ChatState } from './state/chat.state';
import { IndexState } from './state/index.state';
import { DoctorState } from './state/doctor.state';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxsModule} from '@ngxs/store';
import {UserState} from './state/user.state';
import {CommonModule} from '@angular/common'
import {NgxWebstorageModule} from 'ngx-webstorage';







import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';

import { NgxPaginationModule } from 'ngx-pagination';
//import { HttpClientModule } from '@angular/common/http';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { PatientfeedComponent } from './pages/patientfeed/patientfeed.component';
import { DoctorprofileComponent } from './components/Feed/doctorprofile/doctorprofile.component';
import { DoctorInfoComponent } from './components/Feed/doctor-info/doctor-info.component';
import { ChatroomComponent } from './components/chatroom/chatroom.component';
import { LoginPageComponent } from './pages/Auth/login-page/login-page.component';

import { PatientprofileComponent } from './components/patientprofile/patientprofile.component';
import { ChatComponent } from './components/chat/chat.component';

import { PatientprofilepageComponent } from './pages/patientprofilepage/patientprofilepage.component';
import { ChattingpageComponent } from './pages/chattingpage/chattingpage.component';
import { DoctorprofilepageComponent } from './pages/doctorprofilepage/doctorprofilepage.component';
import { DoctorfeedComponent } from './pages/doctorfeed/doctorfeed.component';
import { PostcomponentComponent } from './components/postcomponent/postcomponent.component';
import { SchedulemeetingpageComponent } from './pages/schedulemeetingpage/schedulemeetingpage.component';
import { SchedulemeetingComponent } from './components/schedulemeeting/schedulemeeting.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DoctorSummaryComponent } from './components/doctor-summary/doctor-summary.component';
import { DoctorStatusComponent } from './components/doctor-status/doctor-status.component';
import { VideoStreamingPageComponent } from './pages/video-streaming-page/video-streaming-page.component';
//import { VideoContainerComponent } from './components/video-container/video-container.component';
import { RegisterUserPageComponent } from './pages/Auth/register-user-page/register-user-page.component';
import { RegisterDoctorComponent } from './pages/Auth/Registration/register-doctor/register-doctor.component';
import { HeaderBarComponent } from './components/Feed/header-bar/header-bar.component';
import { ServiceComponent } from './components/service/service.component';
import { ChatMessagePageComponent } from './pages/chat-message-page/chat-message-page.component';
import { InitialChatComponent } from './pages/initial-chat/initial-chat.component';
import { SearchComponentComponent } from './components/search-component/search-component.component';
import { VideoMenuComponent } from './components/video-menu/video-menu.component';
import { VideoMenuPagesComponent } from './pages/video-menu-pages/video-menu-pages.component';
import { VideoStreamingComponentComponent } from './components/video-streaming-component/video-streaming-component.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationPageComponent } from './pages/notification-page/notification-page.component';










@NgModule({ 
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    LoginPageComponent,
    PatientfeedComponent,
    DoctorprofileComponent,
    DoctorInfoComponent,
    ChatroomComponent,
    PatientprofileComponent,
    ChatComponent,
    PatientprofilepageComponent,
    ChattingpageComponent,
    DoctorprofilepageComponent,
    DoctorfeedComponent,
    PostcomponentComponent,
    SchedulemeetingpageComponent,
    SchedulemeetingComponent,
    DoctorSummaryComponent,
    DoctorStatusComponent,
    VideoStreamingPageComponent,
   // VideoContainerComponent,
    RegisterUserPageComponent,
    RegisterDoctorComponent,
    HeaderBarComponent,
    ServiceComponent,
    ChatMessagePageComponent,
    InitialChatComponent,
    SearchComponentComponent,
    VideoMenuComponent,
    VideoMenuPagesComponent,
    VideoStreamingComponentComponent,
    NotificationComponent,
    NotificationPageComponent
  
   
   
    
   
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    NgxPaginationModule, 
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatCardModule,
    NgbModule,
    NgxsModule.forRoot([
      UserState,
      DoctorState,
      IndexState,
      ChatState,
      MessageState,
      ClientState
    ]),
    NgxWebstorageModule.forRoot(),

      
  

   
    
  ],

  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
