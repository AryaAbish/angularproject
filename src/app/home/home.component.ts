import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user:any=""
  acno:any
  profileData:any={}
  pbalance:any={}
  message:any=""
  status:any=true
  shareAcno:any=""

  //model form for money transfer
  moneyTransferForm=this.fb.group({
    toacno:['',[Validators.required,Validators.pattern('[0-9]+')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]+')]],
    psw:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]+')]]
  })

  constructor(private rout:Router,private ds:DataService,private fb:FormBuilder,private datepipe:DatePipe){}

  ngOnInit():void{
    if(!localStorage.getItem("currentacno")){
      alert("Please login")
      this.rout.navigateByUrl("")
    }

    if(localStorage.getItem("currentuname")){
      this.user=localStorage.getItem("currentuname")
      // console.log(this.user);
    }
  }

  logout(){
    localStorage.removeItem("currentacno")
    localStorage.removeItem("currentuname")
    this.rout.navigateByUrl("")
  }

profileView(){
  if(localStorage.getItem("currentacno")){
    this.acno=localStorage.getItem("currentacno")
    // console.log(this.acno); 
  }
  this.ds.getProfile(this.acno).subscribe((response:any)=>{
    // console.log(response);
    this.profileData=response
  })
}

balanceEnquiry(){
  if(localStorage.getItem("currentacno")){
    this.acno=localStorage.getItem("currentacno")
    // console.log(this.acno); 
  }
  this.ds.getbalance(this.acno).subscribe((response:any)=>{
    // console.log(response);
    this.pbalance=response
  })
}

transfer(){
  if(this.moneyTransferForm.valid){
     //fromAcno
  if(localStorage.getItem("currentacno")){
    this.acno=localStorage.getItem("currentacno")
    // console.log(this.acno); 
  }
  var path=this.moneyTransferForm.value
  //toacno
  var toacno=path.toacno
  // console.log(toacno);
  //psw
  var psw=path.psw
  // console.log(psw);
  //amount
  var amount=path.amount
  // console.log(amount);

  //date
  var DateTime=new Date()
  var dateData=this.datepipe.transform(DateTime,'short')
  // console.log(dateData);
  
  //apicall
  this.ds.moneyTransferApi(this.acno,toacno,psw,amount,dateData).subscribe((result:any)=>{
    // console.log(result);
    this.message=result.message
    this.status=true
     },
     result=>{
      // console.log(result.error.message);
      this.message=result.error.message
      this.status=false
     })
  }
  else{
    // alert("Invalid form")
    this.message="Invalid Form"
    this.status=false
  }
}

statement(){
  this.rout.navigateByUrl("statements")
}

deleteAcc(){
  //share data-- acno from local storage
  if(localStorage.getItem("currentacno")){
    this.shareAcno=localStorage.getItem("currentacno")
    // console.log(this.shareAcno);
    
  }
}

cancel(){
  this.shareAcno=""
}

deleteAccount(event:any){
  // console.log(event);   //acno
  this.ds.acdelete(event).subscribe((result:any)=>{
    alert(`${event} deleted successfully`)
    this.logout()
  })
}

}
