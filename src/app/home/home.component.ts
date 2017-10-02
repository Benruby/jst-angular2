import { Component, OnInit, ViewChild } from '@angular/core';
import {AuthService} from "../services/auth/auth.service";
import {AuthDialogComponent} from "../auth-dialog/auth-dialog.component";
import { GamesService } from '../services/games.service';
import {Router} from '@angular/router';
import { Utils } from '../Utils/utils';
import { globals } from 'environments/environment';
import { SpinnerService } from 'app/components/spinner/spinner.service';
import { Title, Meta } from '@angular/platform-browser';
import { defaultGame } from 'environments/environment';


@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

	@ViewChild('authDialog') authDialog: AuthDialogComponent;

	games: any;
	defaultGame: string = defaultGame;

	constructor(
		public authService:AuthService,
		private gamesService:GamesService,
		private router:Router,
		private spinnerService: SpinnerService,
		private metaService: Meta,
		private titleService: Title) { }

	ngOnInit() {
		this.spinnerService.show();
		this.titleService.setTitle("Web Question - JavaScript, HTML and CSS games.");
		this.metaService.updateTag({ name: "description", content:"Web Questions - A resource for questions in JavaScript, HTML and CSS. Test your Web Development knowledge and skills." });
		this.getGames();
		this.spinnerService.hide();
	}

	presentAuthDialog(mode: 'login'){
		this.authDialog.openDialog(mode);
	}

	getGames() {
		return this.gamesService.getGames(4)
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
		this.spinnerService.show();
		this.gamesService.startGame(gameName)
		.then(
			res => {
				if((res.status == 200) && (res.json())){
					this.router.navigate(['/questions/', gameName]);
				}
			},
			err => {
				this.router.navigate(['/']);
			})
		.then(()=> this.spinnerService.show());
	}

	isUserData(){
		return this.authService.isUserData();
	}
}
