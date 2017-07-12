import { Directive, Input, ViewChild, ElementRef, OnInit, Renderer, ContentChild } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Directive({
	selector: '[highlight-js]',
	host: {
		'[class.highlightBackground]':'true'
		// '(mouseenter)':'changeColor()',
		// '[style.background]': '"pink"', 
		// '(click)':'clickMe()',
		// '(mouseout)':'changeColorOnOut()',
	}
})

export class JsHighlight implements OnInit {

	private _data = new BehaviorSubject<any>([]);

	/**
	 * [Input description] - receives the input from the element.
	 */
	 @Input() 
	 set highlightContent(value) {
	 	this._data.next(value);
	 }

	 htmlContent: string = "";

	 constructor(
	 	private el: ElementRef,
	 	private render:Renderer){}

	 ngOnInit() {
	 	this._data
	 	.subscribe(x => {
	 		this.htmlContent = x;
	 		this.showHtmlContent(this.htmlContent);
	 	});
	 }

	 showHtmlContent(data: string): string {
	 	
	 	if (!data) return;

	 	let tempString: string = data;
	 	
		tempString = "<span id='content'>" + tempString + "</span>";

	 	if (data.includes("var")) {
	 		tempString = tempString.replace(/var/g, '<span class="varStyle">var</span>')
	 	}

	 	if (data.includes(".log")) {
	 		tempString = tempString.replace(/.log/g, '<span>.</span><span class="logStyle">log</span>')
	 	}

	 	if (data.includes("function(")) {
	 		tempString = tempString.replace(/function(?=\(|\s\()(?=![a-z])/g, '<span class="functionStyle">function</span>')
	 	}

	 	if (data.includes("//")) {
	 		let phrase = "//";
	 		tempString = tempString.replace(/\/\/((.*))/g, '<span class="commentStyle">// $1</span>')
	 	}
	 	console.log(new RegExp('{'))
	 	this.el.nativeElement.insertAdjacentHTML('afterbegin', tempString);
	  }
	}