import { UsersService } from './users.service';
import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy{
  userOneActivateStatus : boolean = false;
  userTwoActivateStatus : boolean = false;
  subjectSubscribe : Subscription;
  constructor( private usersService: UsersService){}
  ngOnInit(){
    this.subjectSubscribe = this.usersService.userActivated.subscribe(
      (data:{id:number,activate:boolean})=>{
        if(data.id===1){
          this.userOneActivateStatus = data.activate;
        }else if(data.id===2){
          this.userTwoActivateStatus = data.activate;
        }
    })
  }
  ngOnDestroy(){
    this.subjectSubscribe.unsubscribe();
  }
}
