import { Directive, Input, ViewChild, ElementRef, OnInit, Renderer2, ContentChild } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Directive({
	selector: '[highlight-js]',
	host: {
		'[class.highlightBackground]':'true'
	}
})

export class JsHighlight implements OnInit {

	private _data = new BehaviorSubject<any>([]);

	@Input() 
	set highlightContent(value) {
		this._data.next(value);
	}

	htmlContent: string = "";
	element: any = this.el.nativeElement;

	constructor(
		private el: ElementRef,
		private render:Renderer2){}

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
			// tempString = tempString.replace(/var(.*)=/g,"111111");
			tempString = tempString.replace(/var/g, '<span class="varStyle">var</span>')
		}


		if (data.includes("return")) {
			// tempString = tempString.replace(/var(.*)=/g,"111111");
			tempString = tempString.replace(/\sreturn\s/g, '<span class="returnStyle">return  </span>')
		}

		if (data.includes(".log")) {
			tempString = tempString.replace(/\.log/g, '<span>.</span><span class="logStyle">log</span>')
		}

		//change keyword function when row ends with '{'
		if (data.includes("function(")) {
			tempString = tempString.replace(/function(?=\(|\s\()(?=![a-z])/g, '<span class="functionStyle">function</span>');
		}

		if (data.includes("function")) {
			tempString = tempString.replace(/(=\sfunction)/g, '<span>= </span><span class="functionStyle">function</span>');
		}

		if (data.includes("//")) {
			let phrase = "//";
			tempString = tempString.replace(/\/\/((.*))/g, '<span class="commentStyle">// $1</span>')
		}

		this.render.setProperty(this.element, "innerHTML", tempString)
		// this.render.appendChild(this.element, newText);

	}
}