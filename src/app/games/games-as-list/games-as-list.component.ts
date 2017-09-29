import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../services/games.service'
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'app-games-as-list',
	templateUrl: './games-as-list.component.html',
	styleUrls: ['./games-as-list.component.sass']
})
export class GamesAsListComponent implements OnInit {

	gameSubjects: any[];
	gamesList: any[];

	constructor(
		private gamesService:GamesService,
		private titleService: Title
		) { }

	ngOnInit() {

		this.gamesService.getGameSubjects()
		.then(
			res => {
				if(res.status == 200){
					this.gameSubjects = res.json().game_subjects;
				}
			},
			err => {
			});

		// this.gamesService.getAllGames()
		// .then(
		// 	res => {
		// 		if(res.status == 200){
		// 			this.gamesList = res.json().games;
		// 		}
		// 	},
		// 	err => {
		// 	});

		this.titleService.setTitle("Web Questions - more JavaScript, HTML and CSS games.")
	}

}
