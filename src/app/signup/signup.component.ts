import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  pswMatch:boolean=false

  //model for signup
  signUpModelform=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]+')]],
    uname:['',[Validators.required,Validators.pattern('[a-zA-Z]+')]],
    psw:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]+')]],
    cpsw:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]+')]]
  })

  constructor(private rout:Router,private fb:FormBuilder,private ds:DataService){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  signup(){
    // console.log(this.signUpModelform.value.acno);
    var path=this.signUpModelform.value
    var acno=path.acno
    var uname=path.uname
    var psw=path.psw
    var cpsw=path.cpsw

   if(this.signUpModelform.valid){
     if(psw==cpsw){
      this.pswMatch=false
      //api call
      this.ds.signupApi(acno,uname,psw).subscribe((response:any)=>{
        // console.log(response);
        //alert
        alert(`${response.uname} registered...`)
            this.rout.navigateByUrl("")
      },
      response=>{
        alert(response.error)
      })
    }
    else{
      // alert("Password doesnt match")
      this.pswMatch=true
    }
    }
    else{
    alert("Invalid Form")
    }
    // alert("signup worked")
  }

}
