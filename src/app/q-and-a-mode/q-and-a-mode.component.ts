import { 
	Component,
	ViewChildren,
	OnInit,
	AfterViewInit,
	QueryList,
	Output,
	ViewChild,
	EventEmitter,
	OnDestroy } from '@angular/core';
	import { ActivatedRoute } from '@angular/router';
	import { QuestionsService } from '../services/questions.service';
	// import { GamesService } from '../services/games.service';
	import { SelectGameComponent } from './select-game/select-game.component';
	import { SpinnerService } from '../components/spinner/spinner.service';
	import { Title, Meta } from '@angular/platform-browser';
	// import { WindowRef } from 'app/services/windowRef/window-ref';

	declare var $ :any;

	@Component({
		selector: 'app-q-and-a-mode',
		templateUrl: './q-and-a-mode.component.html',
		styleUrls: ['./q-and-a-mode.component.sass']
	})
	export class QAndAModeComponent implements OnInit, AfterViewInit, OnDestroy {

		questions: any[] = [];
		// gamesNames: any[] = [];
		private gameNameParam: any;
		gameName: any;

		@ViewChild('selectGameDialog') selectGameDialog: SelectGameComponent;
		@ViewChildren('questionsCollpsibles') quesCol: QueryList<any>;
		@Output() showGameSelectionDialog: EventEmitter<boolean> = new EventEmitter();


		constructor(
			private questionsService: QuestionsService,
			// private gamesService: GamesService,
			private route: ActivatedRoute,
			private spinnerService: SpinnerService,
			private metaService: Meta,
			private titleService: Title
			// private winRef: WindowRef
			) { }


		ngOnInit() {
			this.spinnerService.show();
			// this.gamesService.getGamesNames()
			// .then((res) => {
				// 	this.gamesNames = res.json().games;
				// }).then(() => {
					// 	this.titleService.setTitle("Web Questions - " + this.gameName);
					// 	this.winRef.nativeWindow.prerenderReady = true
					// }
					// )

					this.gameNameParam = this.route.params.subscribe(params => {
						this.gameName = params['game_name'];
						this.getQuestionsForGame(this.gameName);		
					});
				}

				ngAfterViewInit(): void {
					this.quesCol.changes.subscribe(t => {
						//init the collapsibles after game change.
						$('.collapsible').collapsible();	
					})
				}

				getQuestionsForGame(gameName: string){
					this.spinnerService.show();
					this.questionsService.getGameQuestions(gameName)
					.then((res)=> {
						this.questions = res.json().questions;
						this.selectGameDialog.closeDialog();
						this.spinnerService.hide();
					}).then(() => {
						this.titleService.setTitle("Web Questions - " + this.gameName);
						this.metaService.updateTag({ name: "description", content: this.questions[0].game_long_description});
					});
				}

		/**
		 * the method presents dialog for the user to select a game.
		 * the dialog is only relevant to mobile devices view.
		 */
		 presentSelectGameDialog(){
		 	this.selectGameDialog.openDialog()
		 }

		 ngOnDestroy() {
		 	this.gameNameParam.unsubscribe();
		 }

		}
