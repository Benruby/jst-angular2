import { Component, OnInit, ViewChild, Input, AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import {
	trigger,
	state,
	style,
	animate,
	transition
} from '@angular/animations';



@Component({
	selector: 'app-finished-game',
	templateUrl: './finished-game.component.html',
	styleUrls: ['./finished-game.component.sass'],
	animations: [
	trigger('resultState', [
		state('in', style({
			transform: 'translateX(0)'
		})),
		transition('void => *', [
			style({transform: 'translateX(-100%)'}),
			animate(200)
			]),
		transition('* => void', [
			animate(200, style({transform: 'translateX(100%)'}))
			])
		])
	]
})
export class FinishedGameComponent implements OnInit, AfterViewInit {

	@Input()
	results: any;

	@ViewChild('finishedGame') private finishedGame: ElementRef;

	constructor(private router: Router) { }

	ngOnInit() {
	}

	ngAfterViewInit() {
		this.scrollToTop(this.finishedGame);
	}

	navigateHome() {
		this.router.navigate(['/']);
	}

	scrollToTop(element) {
		element.nativeElement.scrollIntoView();
	}

}
