import { Component, OnInit, DoCheck, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
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
import { ConfigService } from 'app/config/config';
import { WindowRef } from 'app/services/windowRef/window-ref';
import { SpinnerService } from 'app/components/spinner/spinner.service';
import { Title, Meta } from '@angular/platform-browser';
import { GamesService } from '../services/games.service';
declare var $ :any;

@Component({
	selector: 'app-questions',
	templateUrl: './questions.component.html',
	styleUrls: ['./questions.component.sass']
})

export class QuestionsComponent implements OnInit, DoCheck, OnDestroy {

	@Output() onGameStatus = new EventEmitter<any>();
	@ViewChild('gameFinishedDialog') gameFinishedDialog: FinishedGameDialogComponent;
	@ViewChild('questioScrollPoint') private scrollPoint: ElementRef;
	@ViewChild('answerScrollPoint') private answerScrollPoint: ElementRef;

	question: Observable<any> = new Observable();
	result: any;
	explanation: any;
	gameName: string;
	private sub: any;
	showEndGamePage: boolean = false
	collapsible: any;
	enableAnswer: boolean = true;
	counter: number;
	
	results: GameResult = {
		numOfQuestions: 0,
		numOfCorrectAnswers: 0,
		gameScore: 0
	};

	constructor(
		private questionService:QuestionsService,
		private route: ActivatedRoute,
		private router:Router,
		private anonService: AnonUserService,
		private config: ConfigService,
		private windowRef: WindowRef,
		private spinnerService: SpinnerService,
		private titleService: Title,
		private metaService: Meta,
		private gamesService:GamesService) { }

	ngOnInit() {
		this.spinnerService.show();
		this.counter = +localStorage.getItem('q_num') || 1;
		this.sub = this.route.params.subscribe(params => {
			this.gameName = params['game_name']; 
			this.metaService.updateTag({ name: "description", content: "Answer these short questions in JavaScript, HTML or CSS and test your Web Development skills. "})
			this.titleService.setTitle("Web Questions - " + this.gameName);
		});
		this.startGame();
		this.getQuestion();
		this.windowRef.nativeWindow.scrollTo(0,0);
		this.spinnerService.hide();
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
				self.spinnerService.show();
				self.enableAnswer = false;
				self.markAnswerAsInccorect(el[0].dataset.questionId);
			}
		});
	}

	startGame(){
		this.gamesService.startGame(this.gameName)
		.then(
			res => {
				if((res.status == 200) && (res.json())){
				}
			},
			err => {
			});
	}

	closeSpinnerAndEnableAnswers(){
		this.enableAnswer = true;
		this.spinnerService.hide();
	}

	getQuestion(){
		this.spinnerService.show();
		return this.questionService.getQuestion()
		.finally(() => this.closeSpinnerAndEnableAnswers())
		.subscribe(
			res => {

				if (res.json().message === "finished"){
					this.results.numOfQuestions = res.json().num_of_questions;
					this.results.numOfCorrectAnswers = res.json().correct_answers;
					this.results.gameScore = res.json().score;
					this.showEndGamePage = true;
					return;
				}

				if(res.status == 200){
					this.question = res.json().question;
					localStorage.setItem('q_num', this.counter.toString());
				}
			},
			err => {
				this.spinnerService.hide();
				this.router.navigate(['/']);
			});
	}

	nextQuestion(){
		$('.collapsible').collapsible('close', 0);
		this.getQuestion();
		if (this.config.shouldScrollPage()) {
			this.windowRef.nativeWindow.scrollTo(0,0)
		}
	}

	answerQuestion(event: any): void {

		/*makes sure user can't click multiple time while answering 
		is in progress*/
		if (!this.enableAnswer) {
			return;
		}
		this.spinnerService.show();
		this.enableAnswer = false;

		if (!this.anonService.checkIfAnonUserIsSet()) {
			this.router.navigate(['/']);
			this.spinnerService.hide();
			return;
		}

		$('.collapsible').collapsible('close', 0);

		let answerId = event.currentTarget.dataset.answerId;
		let questionId = event.currentTarget.dataset.questionId;
		this.questionService.answerQuestion(questionId, answerId)
		.then(res => {
			this.result = res.json();
			this.counter++;
			this.nextQuestion();	
		}, err => {
			this.closeSpinnerAndEnableAnswers();
			this.router.navigate(['/']);
		})
	}

	markAnswerAsInccorect(questionId) {
		this.questionService.getQuestionAnswer(questionId)
		.then(res => {
			this.explanation = res.json().explanation.answer_explanation;
			this.spinnerService.hide();
		});
	}

	ngOnDestroy(){
		localStorage.setItem('q_num', "0");
		this.titleService.setTitle("Web Questions - Test Your Skills in JavaScript, HTML and CSS.");
	}
	
}
