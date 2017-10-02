import { Component, OnInit, ViewChild } from '@angular/core';
import {Angular2TokenService} from "angular2-token";
import {environment} from "../environments/environment";
import { Utils } from './Utils/utils';
import { Title, Meta } from '@angular/platform-browser';
import { WindowRef } from 'app/services/windowRef/window-ref';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
	
	@ViewChild('toolBar') toolBar;

	title = 'app';
	constructor(
		private authToken: Angular2TokenService,
		private metaService: Meta,
		private winRef: WindowRef
		){
		this.winRef.nativeWindow.prerenderReady = false;
		this.authToken.init(environment.token_auth_config);
	}

	ngOnInit() {
		this.metaService.updateTag({ httpEquiv: "Content-Type", content: "text/html; charset=utf-8"});
	}

}
