import { Component, OnInit, DoCheck, Output, EventEmitter, ViewChild } from '@angular/core';
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
import { AnonUserService } from 'app/services/anon-user.service';
declare var $ :any;

@Component({
	selector: 'app-questions',
	templateUrl: './questions.component.html',
	styleUrls: ['./questions.component.sass']
})

export class QuestionsComponent implements OnInit, DoCheck {

	@Output() onGameStatus = new EventEmitter<any>();
	@ViewChild('gameFinishedDialog') gameFinishedDialog: FinishedGameDialogComponent;

	question: Observable<any> = new Observable();
	result: any;
	explanation: any;
	disabledAnswers: boolean = false;
	gameName: string;
	private sub: any;
	showEndGamePage: boolean = false
	questionCounter: number = 1;
	collapsible: any;
	enableAnswer: boolean = true;
	
	results: GameResult = {
		numOfQuestions: 0,
		numOfCorrectAnswers: 0,
		gameScore: 0
	};

	constructor(
		private questionService:QuestionsService,
		private route: ActivatedRoute,
		private router:Router,
		private anonService: AnonUserService) { }

	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
			this.gameName = params['game_name']; 
		});
		this.getQuestion();
	}

	ngDoCheck() {
		if (!this.anonService.checkIfAnonUserIsSet()) {
			this.router.navigate(['/']);
		}
	}

	ngAfterViewInit() {
		let self = this;
		this.collapsible = $('.collapsible').collapsible({
			onOpen: function(el) { 
				self.enableAnswer = false;
				self.markAnswerAsInccorect(el[0].dataset.questionId);
			}
		});
	}

	getQuestion(){

		this.enableAnswer = true;
		return this.questionService.getQuestion()
		.subscribe(
			res => {

				if (res.json().message === "finished"){
					this.results.numOfQuestions = res.json().num_of_questions;
					this.results.numOfCorrectAnswers = res.json().correct_answers;
					this.results.gameScore = res.json().score;
					this.showEndGamePage= true;
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
		$('.collapsible').collapsible('close', 0);
		this.getQuestion();
	}

	answerQuestion(event: any): void {

		if (!this.anonService.checkIfAnonUserIsSet()) {
			this.router.navigate(['/']);
			return;
		}

		$('.collapsible').collapsible('close', 0);

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

	markAnswerAsInccorect(questionId) {
		// console.log("showing answer")
		//  $('.collapsible').collapsible('open', 0);
		//   $('.collapsible').collapsible('destroy');
		this.questionService.getQuestionAnswer(questionId)
		.then(res => {
			this.explanation = res.json().explanation.answer_explanation;
		})
	}

}
