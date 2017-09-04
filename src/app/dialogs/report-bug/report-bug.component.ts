import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeAction } from "angular2-materialize";
import { ReportBugService } from 'app/services/report-bug.service';
import { MessageSystemService } from 'app/components/message-system/message-system.service';

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

	constructor(
		private reportBugService: ReportBugService,
		private messageService: MessageSystemService
		) { }

	ngOnInit() {
	}

	openDialog(){
		this.modalActions.emit({action:"modal", params:['open']});
	}

	closeDialog() {
		this.modalActions.emit({action:"modal", params:['close']});
	}

	reportBug(captchaResponse: string) {

		this.reportData["g-recaptcha-response"] = captchaResponse;
		
		this.reportBugService.reportBug(this.reportData)
		.then((res) => {
			this.messageService.show("the issue was submitted successfuly. Thank you!");
		},
		err => {
			this.messageService.show("Couldn't submit the issue. please try again later.");
		})
		.then(() => this.closeDialog());
	}


}
