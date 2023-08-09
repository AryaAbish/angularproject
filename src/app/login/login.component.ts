import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  data="Happy Banking With Us..."
  pdata="Enter account number"

  // acno:string=""
  // psw:string=""

  // serviceData:any=""
  
  //model for login
  loginModelform=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]+')]],
    psw:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]+')]]
  })
  
  constructor(private rout:Router,private ds:DataService,private fb:FormBuilder){}

  ngOnInit():void{
    
    // console.log(this.ds.sData);
    // this.serviceData=this.ds.sData
  }

  // login(a:any,b:any){
  //   // alert("login clicked")
  //   // console.log(a.value);
  //   // console.log(b.value);
  //   this.acno=a.value
  //   this.psw=b.value
  //   console.log(this.acno);
  //   console.log(this.psw);
  // }

  login(){
    
    // this.ds.accessData("hello")
    // this.ds.accessData(this.acno)
    // console.log(this.acno);
    // console.log(this.psw);

    if(this.loginModelform.valid){
      var acno=this.loginModelform.value.acno
      var psw=this.loginModelform.value.psw
      //api call
      this.ds.loginApi(acno,psw).subscribe((response:any)=>{
        alert(`${response.uname} login success..`)

        //store uname,acno in local storage
        localStorage.setItem("currentuname",response.uname)
        localStorage.setItem("currentacno",response.acno)
        // console.log(response.token);
        localStorage.setItem("token",JSON.stringify(response.token))

        this.rout.navigateByUrl("home")
      },
      response=>{
        alert(response.error)
      })
      // this.rout.navigateByUrl("home")
    }
    else{
      alert("Invalid Form")
    }
  }

  // acnochange(event:any){
  //   // console.log(event.target.value);
  //   this.acno=event.target.value
  //   console.log(this.acno);
    
  // }
  // paschange(event:any){
  //   console.log(event.target.value);
    
  // }

}
