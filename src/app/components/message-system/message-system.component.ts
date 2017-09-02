import { Component, OnInit, OnDestroy, trigger, transition, style, animate } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MessageSystemService } from './message-system.service';
import { MessageState } from './message-state';

@Component({
	selector: 'app-message-system',
	templateUrl: './message-system.component.html',
	styleUrls: ['./message-system.component.sass'],
	animations: [
	trigger(
		'showMessage', [
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
	]
})
export class MessageSystemComponent implements OnInit {

	show: boolean = false;
	messageText: string;
	private subscription: Subscription;

	constructor(private messagesService: MessageSystemService) { }

	ngOnInit() {
		this.subscription = this.messagesService.messageState
		.subscribe((state: MessageState) => {
			this.show = state.show;
			this.messageText = state.messageText;
		});
	}

	closeMessage(){
		this.messagesService.hide();
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

}
