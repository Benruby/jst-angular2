import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../services/questions.service';
import { AuthService } from "../services/auth/auth.service";
import {BehaviorSubject} from "rxjs/Rx";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';

@Component({
	selector: 'app-questions',
	templateUrl: './questions.component.html',
	styleUrls: ['./questions.component.sass']
})

export class QuestionsComponent implements OnInit {

	question: Observable<any> = new Observable();
	result: any;
	disabledAnswers: boolean = false;

	constructor(private questionService:QuestionsService) { }

	ngOnInit() {
		this.getQuestion();
	}

	getQuestion(){
		return this.questionService.getQuestion()
		.subscribe(
			res => {
				if(res.status == 200){
					console.log(res.json())
					this.question = res.json().question;
				}
			},
			err => {
				console.log('err:', err);
			}
			);
	}

	nextQuestion(){
		this.getQuestion();
	}

	answer(event: any): void {

		/*makes sure user can't click multiple time while answering 
		is in progress*/
		if (this.disabledAnswers) {
			return;
		}
		this.disabledAnswers = true;
		let answerId = event.target.dataset.answerId;
		let questionId = event.target.dataset.questionId;
		this.questionService.answerQuestion(questionId, answerId)
		.then(res => {
			this.result = res.json();
			if (this.result) {
				this.nextQuestion();	
			}
		})
		.then(() => this.disabledAnswers = false);
	}
}
