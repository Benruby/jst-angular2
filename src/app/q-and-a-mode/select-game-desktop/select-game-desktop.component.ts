import { Component, OnInit, Input } from '@angular/core';
import { GamesService } from '../../services/games.service';

@Component({
	selector: 'app-select-game-desktop',
	templateUrl: './select-game-desktop.component.html',
	styleUrls: ['./select-game-desktop.component.sass']
})
export class SelectGameDesktopComponent implements OnInit {

	gamesNames: any[] = [];
	@Input() gamesNamesList: any;

	constructor(
		private gamesService: GamesService
		) { }

	ngOnInit() {
		// this.gamesService.getGamesNames()
		// .then((res) => {
		// 	this.gamesNames = res.json().games;
		// }).then(() => {
		// 	// this.winRef.nativeWindow.prerenderReady = true
		// }
		// )
	}

}
