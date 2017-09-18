import { Component, OnInit } from '@angular/core';
import { GamesService } from '../services/games.service'
import {AuthService} from "../services/auth/auth.service";
import { Observable} from "rxjs";
import {Router} from '@angular/router';


@Component({
	selector: 'app-games',
	templateUrl: './games.component.html',
	styleUrls: ['./games.component.sass']
})
export class GamesComponent implements OnInit {

	games: any[];

	constructor(
		public authService:AuthService,
		private gamesService:GamesService,
		private router:Router) { }

	ngOnInit() {
		return this.gamesService.getAllGames()
		.then(
			res => {
				if(res.status == 200){
					this.games = res.json().games;
				}
			},
			err => {
			});
	}

	startGame(gameName: string): void {
		this.gamesService.startGame(gameName)
		.then(
			res => {
				if((res.status == 200) && (res.json())){
					this.router.navigate(['/questions/', gameName]);
				}
			},
			err => {
			});
	}

}
