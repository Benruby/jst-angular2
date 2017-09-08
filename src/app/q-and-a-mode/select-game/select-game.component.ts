import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { MaterializeAction } from "angular2-materialize";


@Component({
	selector: 'app-select-game',
	templateUrl: './select-game.component.html',
	styleUrls: ['../q-and-a-mode.component.sass']
})
export class SelectGameComponent implements OnInit {

	@Input() gamesNamesList: any;
	modalActions = new EventEmitter<string|MaterializeAction>();

	constructor() { }

	ngOnInit() {
	}

	openDialog(){
		this.modalActions.emit({action:"modal", params:['open']});
	}

	closeDialog() {
		this.modalActions.emit({action:"modal", params:['close']});
	}
}
