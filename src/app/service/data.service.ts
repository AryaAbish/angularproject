import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

//overloading headers
const options={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})

export class DataService {

  sData="data inside service file"

  constructor(private http:HttpClient) { }

//method to add token in api header
createHeader(){
  //httpHeaders
  const headers=new HttpHeaders()

  //access token from local storage
  if(localStorage.getItem("token")){
    var token=JSON.parse(localStorage.getItem("token") || "")

    //add token into header
    options.headers=headers.append('access_token',token)
  }
  return options
}

  // accessData(data:any){
  //   console.log(data); 
  // }

  //register
signupApi(acno:any,uname:any,psw:any){
  const bodyData={
    acno,
    uname,
    psw
  }
  return this.http.post('http://localhost:3003/bankuser/user-register',bodyData)
}

//login
loginApi(acno:any,psw:any){
 const bodyData={
  acno,psw
 } 
 return this.http.post('http://localhost:3003/bankuser/user-login',bodyData)
}

//get user profile details
getProfile(acno:any){
  return this.http.get('http://localhost:3003/bankuser/user-profile/'+acno,this.createHeader())
}

//balance Enquiry
getbalance(acno:any){
  return this.http.get('http://localhost:3003/bankuser/user-balance/'+acno,this.createHeader())
}

//money transfer
//fromacno,toacno,psw,amount,date
moneyTransferApi(fromAcno:any,toAcno:any,psw:any,amount:any,date:any){
  const bodyData={
    fromAcno,toAcno,psw,amount,date
  }
  return this.http.post('http://localhost:3003/bankuser/money-transfer',bodyData,this.createHeader())
}

//transaction history
transactionHistory(acno:any){
  return this.http.get('http://localhost:3003/bankuser/user-history/'+acno,this.createHeader())
}

//delete ac api
acdelete(acno:any){
  return this.http.delete('http://localhost:3003/bankuser/user-delete/'+acno,this.createHeader())
}

}