import { Component, OnInit, ViewChild } from '@angular/core';
import {AuthService} from "../services/auth/auth.service";
import {AuthDialogComponent} from "../auth-dialog/auth-dialog.component";
import { GamesService } from '../services/games.service';
import {Router} from '@angular/router';
import { Utils } from '../Utils/utils';
import { anon_token } from 'environments/environment';


@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

	@ViewChild('authDialog') authDialog: AuthDialogComponent;

	games: any;

	constructor(
		public authService:AuthService,
		private gamesService:GamesService,
		private router:Router) { }

	ngOnInit() {
		this.getGames();
		console.log("home init")
	}

	presentAuthDialog(mode: 'login'){
		this.authDialog.openDialog(mode);
	}

	getGames() {
		return this.gamesService.getGames(4)
		.then(
			res => {
				if(res.status == 200){
					console.log(res.json())
					this.games = res.json().games;
				}
			},
			err => {
				console.log('err:', err);
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
				this.router.navigate(['/']);
				console.log('err:', err);
			});
	}

	// checkIfGameIsPlayed() {}

}
