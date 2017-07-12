import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {AuthService} from "../services/auth/auth.service";


@Component({
	selector: 'app-forgotpassword',
	templateUrl: './forgotpassword.component.html',
	styleUrls: ['./forgotpassword.component.sass']
})
export class ForgotpasswordComponent implements OnInit {

	clientId: string;
	token: string;

	userResetPasword = {
		password:"",
		passwordConfirmation:"",
		passwordCurrent: null,
		userType: "",
		resetPasswordToken: ""
	};

	@Output() onFormResult = new EventEmitter<any>();

	constructor(private activatedRoute: ActivatedRoute,
		public authService:AuthService
		){}

	ngOnInit() {
		this.activatedRoute.queryParams.subscribe((params: Params) => {
			this.userResetPasword.resetPasswordToken = params['token'];
		});
	}

	changePassword() {

		this.authService.updatePassword(this.userResetPasword).subscribe(
			res => {
				if(res.status == 200){
				}
			},
			err => {
				console.log('err:', err);
			}
			);
	}

}
