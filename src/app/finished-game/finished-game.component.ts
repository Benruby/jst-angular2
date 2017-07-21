import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';

@Component({
	selector: 'app-finished-game',
	templateUrl: './finished-game.component.html',
	styleUrls: ['./finished-game.component.sass']
})
export class FinishedGameComponent implements OnInit {

	@Input()
	results: any;

	constructor(private route:Router) { }

	ngOnInit() {
	}

}
