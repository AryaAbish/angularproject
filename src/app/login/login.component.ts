import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  data="Happy Banking With Us..."
  pdata="Enter account number"
  acno:any=""

  constructor(){}

  ngOnInit():void{}

  login(){
    alert("login clicked")
  }

  acnochange(event:any){
    // console.log(event.target.value);
    this.acno=event.target.value
    console.log(this.acno);
    
  }
  paschange(event:any){
    console.log(event.target.value);
    
  }

}
