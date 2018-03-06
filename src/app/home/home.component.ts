import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  numberObsSubscription : Subscription;
  customSubscription : Subscription;
  constructor() { }

  ngOnInit() {
    const myNumbers = Observable.interval(1000);
    this.numberObsSubscription = myNumbers.subscribe((number : Number)=>{
      console.log(number);
    });
    
    const myObservable = Observable.create((observer : Observer<string>)=>{
      setTimeout(()=>{
        observer.next("first package");
      },2000);
      setTimeout(()=>{
        observer.next("2nd package");
      },4000);
      // setTimeout(()=>{
      //   observer.error("package error");
      // },6000);
      setTimeout(()=>{
        observer.complete();
      },8000);
    });
    this.customSubscription = myObservable.subscribe((data : String)=>{
      console.log(data);
    },
    (error:string)=>{
      console.log("Error is "+error);
    },
    ()=>{
      console.log("Completed");
    });
  }
  
  ngOnDestroy(){
    this.numberObsSubscription.unsubscribe();
    this.customSubscription.unsubscribe();
  }
}
