import { UserSelectors } from './../../../selector/user.selector';
import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import {Store, Select} from '@ngxs/store'
import { User } from 'src/app/models/user.model';
import { UserState } from 'src/app/state/user.state';


@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent implements OnInit {
  

  @Select(UserSelectors.userInfo)
  users$!: Observable<User[]>;
  datas! :User[]

 

  
  
  constructor(private store : Store) { 
  }

  ngOnInit(): void {
    //this.users$.subscribe((data) => this.datas = data)
    

  }

}
