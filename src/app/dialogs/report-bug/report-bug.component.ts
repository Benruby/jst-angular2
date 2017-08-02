import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeAction } from "angular2-materialize";
import { ReportBugService } from 'app/services/report-bug.service';

@Component({
	selector: 'app-report-bug', 
	templateUrl: './report-bug.component.html',
	styleUrls: ['./report-bug.component.sass']
})
export class ReportBugComponent implements OnInit {

	modalActions = new EventEmitter<string|MaterializeAction>();

	reportData = {
		user_name: "",
		email: "",
		content: "",
		'g-recaptcha-response': null
	}

	constructor(private reportBugService: ReportBugService) { }

	ngOnInit() {
	}

	openDialog(){
		this.modalActions.emit({action:"modal", params:['open']});
	}

	reportBug(captchaResponse: string) {

		this.reportData["g-recaptcha-response"] = captchaResponse;
		
		this.reportBugService.reportBug(this.reportData)
		.then(res => res);
	}


}
