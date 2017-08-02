import { Component, OnInit, ViewChild } from '@angular/core';
import {Angular2TokenService} from "angular2-token";
import {environment} from "../environments/environment";
import { Utils } from './Utils/utils';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
	
	@ViewChild('toolBar') toolBar;

	title = 'app';
	constructor(private authToken: Angular2TokenService){
		this.authToken.init(environment.token_auth_config);
	}

	ngOnInit() {}

}
