import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { SpinnerState } from './spinner';

@Injectable()
export class SpinnerService {

	private spinnerSubject = new Subject<SpinnerState>();
	spinnerState = this.spinnerSubject.asObservable();

	constructor() { }

	show() {
		console.log('spinner!')
		this.spinnerSubject.next(<SpinnerState>{show: true});
	}

	hide() {
		console.log('spinner is DONE')
		this.spinnerSubject.next(<SpinnerState>{show: false});
	}
}
