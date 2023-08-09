import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

import jspdf from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  acno:any
  transactions:any=[]
  date:any
  searchKey:any=""

  constructor(private rout:Router,private ds:DataService){}

  ngOnInit(): void {
    //date
    this.date=new Date()
    // console.log(this.date);
    
    //acno
    if(localStorage.getItem("currentacno")){
      this.acno=localStorage.getItem("currentacno")  
      // console.log(this.acno); 
    }
    this.ds.transactionHistory(this.acno).subscribe((result:any)=>{
      this.transactions=result
      // console.log(this.transactions);
    })
  }

  back(){
    this.rout.navigateByUrl("home")
  }

  searchKeychange(key:any){
    this.searchKey=key
  }

  convertpdf(){
    //create an object for jsPDF
    var pdf= new jspdf()

    //set columns title
    let col=["Transaction Type","Amount","Account Holder","Date"]

    //row
    let row:any=[]

    //style set
    pdf.setFontSize(16);

    //title
    pdf.text("Account Statement",15,10)   //title,x-axis,y-axis

    //text colour
    pdf.setTextColor(99)

    //reset font size
    pdf.setFontSize(12);

    //convert array of objects to array of array(nested array)
    var allItems=this.transactions
    for(let i of this.transactions){
      let rowData=[i.type,i.amount,i.User,i.date]
      row.push(rowData)
    }

    //convert nested array to pdf
    (pdf as any).autoTable(col,row,{startY:15})

    //open pdf in a new window
    pdf.output('dataurlnewwindow')

    //pdf auto download
    pdf.save('ministatement.pdf')

  }

}
