import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {

  //create a variable to accept the data from parent component
  @Input() childAcno:string|undefined 

  @Output() onCancel=new EventEmitter()
  @Output() onDelete=new EventEmitter()

  noClick(){
    this.onCancel.emit()
  }

  acDelete(){
    this.onDelete.emit(this.childAcno)
  }

}
