import { Component, OnInit, ElementRef, HostListener, Input, trigger, transition, style, animate } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'app-bring-to-top',
	templateUrl: './bring-to-top.component.html',
	styleUrls: ['./bring-to-top.component.sass'],
	animations: [
    trigger(
      'showButtonAnimation', [
        transition(':enter', [
          style({transform: 'translateY(100%)', opacity: 0}),
          animate('150ms', style({transform: 'translateY(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(0)', opacity: 1}),
          animate('150ms', style({transform: 'translateY(100%)', opacity: 0}))
        ])
      ]
    )
  ],
})
export class BringToTopComponent implements OnInit {

	showButton: boolean = false;
	private scrolls = new Subject();
	private subscription: Subscription;

	@Input('scrollInterval') scrollInterval: number;

	constructor(private element: ElementRef) { }

	@HostListener('window:scroll', ['$event']) 
	showHideButton(event) {
		event.preventDefault();
		event.stopPropagation();
		this.scrolls.next(event);
	}

	ngOnInit() {
		this.subscription = this.scrolls
		.debounceTime(100).subscribe(e => this.showButtonOnPage());
	}


	showButtonOnPage(){
		if (document.body.scrollTop > 80) {
			this.showButton = true;
		} else {
			this.showButton = false;
		}
	}

	bringToTop() {

	let yOffset = window.pageYOffset;
	let scrollPixel = this.scrollInterval;
		
		let scroll = setInterval(function(){

				if (yOffset > 0) {
					window.scrollBy(0, -scrollPixel);
					yOffset -= scrollPixel;	
				} else {
					clearInterval(scroll);
					return;
				}
			},15)
	}

}
