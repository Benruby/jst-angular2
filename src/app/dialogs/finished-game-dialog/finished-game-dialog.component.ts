import {Component, OnInit, Input, EventEmitter, ElementRef} from '@angular/core';
import {MaterializeAction} from "angular2-materialize";
declare var $:any;

@Component({
  selector: 'app-finished-game-dialog',
  templateUrl: './finished-game-dialog.component.html',
  styleUrls: ['./finished-game-dialog.component.sass']
})
export class FinishedGameDialogComponent implements OnInit {

  modalActions = new EventEmitter<string|MaterializeAction>();


  constructor(private el: ElementRef) { }

  ngOnInit() {

  }

  openDialog(){
    this.modalActions.emit({action:"modal", params:['open']});
  }

  closeDialog(){
    this.modalActions.emit({action:"modal", params:['close']});
  }

}
