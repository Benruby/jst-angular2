import { Component, OnInit, ViewChild } from '@angular/core';
import {AuthService} from "../services/auth/auth.service";
import {AuthDialogComponent} from "../auth-dialog/auth-dialog.component";



@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

	@ViewChild('authDialog') authDialog: AuthDialogComponent;


	constructor(public authService:AuthService) { }

	ngOnInit() {
	}

	presentAuthDialog(mode: 'login'){
		this.authDialog.openDialog(mode);
	}

}
