import { Injectable, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { MessageState } from './message-state';

@Injectable()
export class MessageSystemService {


	private delay: number = 5000;
	private messagesSubject = new Subject<MessageState>();
	messageState = this.messagesSubject.asObservable();

	constructor() { }

	show(message) {
		this.messagesSubject.next(<MessageState>{show: true, messageText: message});
		setTimeout(() => {this.hide()}, this.delay);
	}

	hide() {
		this.messagesSubject.next(<MessageState>{show: false});
	}

}
