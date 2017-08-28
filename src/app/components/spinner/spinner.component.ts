import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SpinnerService } from './spinner.service';
import { SpinnerState } from './spinner';

@Component({
	selector: 'app-spinner',
	templateUrl: './spinner.component.html',
	styleUrls: ['./spinner.component.sass']
})
export class SpinnerComponent implements OnInit {

	show: boolean = false;
	private subscription: Subscription;

	constructor(private spinnerService: SpinnerService) { }

	ngOnInit() {
		this.subscription = this.spinnerService.spinnerState
		.subscribe((state: any) => {
			this.show = state.show;
		});
	}

	ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
