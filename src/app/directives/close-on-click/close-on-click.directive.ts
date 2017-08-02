import { Directive, ElementRef, AfterContentInit, EventEmitter, Output } from '@angular/core';

@Directive({
	selector: '[close-on-click]',
	host: {
		'(document:click)': 'closeDropdown($event)',
	}
})
export class CloseOnClickDirective implements AfterContentInit {

	constructor(private el: ElementRef) { }


	@Output() closeDropdownOnDocumentClick: EventEmitter<any> = new EventEmitter();

	ngAfterContentInit() {

	}

	closeDropdown(event: any) {
		if (!this.el.nativeElement.contains(event.target)) {
			this.closeDropdownOnDocumentClick.emit();
		}
	}
}
