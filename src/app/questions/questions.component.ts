import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { QuestionsService } from '../services/questions.service';
import { AuthService } from "../services/auth/auth.service";
import {BehaviorSubject} from "rxjs/Rx";
import {Router} from '@angular/router';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import { ActivatedRoute } from '@angular/router';
import { FinishedGameDialogComponent } from '../dialogs/finished-game-dialog/finished-game-dialog.component';
import { GameResult } from '../interfaces/game-result';

@Component({
	selector: 'app-questions',
	templateUrl: './questions.component.html',
	styleUrls: ['./questions.component.sass']
})

export class QuestionsComponent implements OnInit {

	@Output() onGameStatus = new EventEmitter<any>();
	@ViewChild('gameFinishedDialog') gameFinishedDialog: FinishedGameDialogComponent;

	question: Observable<any> = new Observable();
	result: any;
	disabledAnswers: boolean = false;
	gameName: string;
	private sub: any;
	showEndGamePage: boolean = false

	questionCounter: number = 1;
	
	results: GameResult = {
		numOfQuestions: 0,
		numOfCorrectAnswers: 0,
		gameScore: 0
	};

	constructor(
		private questionService:QuestionsService,
		private route: ActivatedRoute,
		private router:Router) { }

	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
			this.gameName = params['game_name']; 
		});
		this.getQuestion();
	}

	getQuestion(){
		return this.questionService.getQuestion()
		.subscribe(
			res => {

				if (res.json().message === "finished"){
					console.log("open modal and redirect");
					this.results.numOfQuestions = res.json().num_of_questions;
					this.results.numOfCorrectAnswers = res.json().correct_answers;
					this.results.gameScore = res.json().score;
					this.showEndGamePage= true;
					// this.presentGameFinishedDialog();
					return;
				}

				if(res.status == 200){
					console.log(res.json())
					this.question = res.json().question;
				}
			},
			err => {
				this.router.navigate(['/']);
			}
			);
	}

	nextQuestion(){
		this.getQuestion();
	}

	answerQuestion(event: any): void {

		/*makes sure user can't click multiple time while answering 
		is in progress*/
		if (this.disabledAnswers) {
			return;
		}
		this.disabledAnswers = true;
		let answerId = event.currentTarget.dataset.answerId;
		let questionId = event.currentTarget.dataset.questionId;
		this.questionService.answerQuestion(questionId, answerId)
		.then(res => {
			this.result = res.json();
			console.log(this.result)
			if (this.result) {
				
			} 
			this.nextQuestion();	
		})
		.then(() => this.disabledAnswers = false);
	}

	getQuestionNumber() {

	}

}
