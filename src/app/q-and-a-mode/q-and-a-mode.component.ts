import { 
	Component,
	ViewChildren,
	OnInit,
	AfterViewInit,
	QueryList,
	OnDestroy } from '@angular/core';
	import { ActivatedRoute } from '@angular/router';
	import { QuestionsService } from '../services/questions.service';
	import { GamesService } from '../services/games.service';
	declare var $ :any;

	@Component({
		selector: 'app-q-and-a-mode',
		templateUrl: './q-and-a-mode.component.html',
		styleUrls: ['./q-and-a-mode.component.sass']
	})
	export class QAndAModeComponent implements OnInit, AfterViewInit, OnDestroy {

		questions: any[] = [];
		gamesNames: any[] = [];
		private gameNameParam: any;

		@ViewChildren('questionsCollpsibles') quesCol: QueryList<any>;

		constructor(
			private questionsService: QuestionsService,
			private gamesService: GamesService,
			private route: ActivatedRoute
			) { }


		ngOnInit() {

			this.gamesService.getGamesNames()
			.then((res) => {
				console.log(res.json().games);
				this.gamesNames = res.json().games;
			})

			this.gameNameParam = this.route.params.subscribe(params => {
				let nameParam = params['game_name'];
				this.getQuestionsForGame(nameParam)		
			});
		}

		ngAfterViewInit(): void {
			this.quesCol.changes.subscribe(t => {
				//init the collapsibles after game change.
				$('.collapsible').collapsible();	
			})
		}

		getQuestionsForGame(gameName: string){
			this.questionsService.getGameQuestions(gameName)
			.then((res)=> {
				console.log(res.json());
				this.questions = res.json().questions;
			});
		}

		ngOnDestroy() {
			this.gameNameParam.unsubscribe();
		}

	}
