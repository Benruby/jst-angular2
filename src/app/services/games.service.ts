import { Injectable } from '@angular/core';
import { Angular2TokenService } from "angular2-token";
import { Observable} from "rxjs";
import { RequestOptions } from '@angular/http';
import { Response } from "@angular/http";
import 'rxjs/add/operator/toPromise';


@Injectable()
export class GamesService {

	constructor(public authService:Angular2TokenService) { }

	getAllGames():Promise<Response>{
		return this.authService.get('/games/get_games')
		.toPromise()
		.then(response => response);
	}

	getGames(num_of_games: number):Promise<Response>{

		let requestOptions = new RequestOptions();
		requestOptions.body = {
			num_of_games: num_of_games
		};

				//only if user isn't signed in.
		// requestOptions.body.user_token = "ewr34r34rf3f34rt3";

		return this.authService.get('/games/get_num_games', {search: requestOptions})
		.toPromise()
		.then(response => response);
	}

	startGame(game):Promise<Response>{
		let requestOptions = new RequestOptions();
		requestOptions.body = {
			game_name: game
		};

		return this.authService.get('/games/start_game', {search: requestOptions})
		.toPromise()
		.then(response => response);
	}

	// checkIfGameIsPlayed(game_id: number) {
	// 	/**
	// 	 * get the game id.
	// 	 * ask the server if the user has this game.
	// 	 * is user has it, get the last.
	// 	 * if finished, get the score.
	// 	 * show an icon to user.
	// 	 */
	// 	let requestOptions = new RequestOptions();
	// 	requestOptions.body = {
	// 		game_id: game_id
	// 	};

	// 	return this.authService.get('/games/start_game', {search: requestOptions})
	// 	.toPromise()
	// 	.then(response => response);
	// }

}
