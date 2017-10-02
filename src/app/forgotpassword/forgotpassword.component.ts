import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {AuthService} from "../services/auth/auth.service";
import { SpinnerService } from '../components/spinner/spinner.service';
import { MessageSystemService } from '../components/message-system/message-system.service';

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

	constructor(
		private activatedRoute: ActivatedRoute,
		public authService:AuthService,
		private spinnerService: SpinnerService,
		private message: MessageSystemService,
		private router: Router
		){}

	ngOnInit() {
		this.activatedRoute.queryParams.subscribe((params: Params) => {
			this.userResetPasword.resetPasswordToken = params['token'];
		});
	}

	changePassword() {
		this.spinnerService.show();
		this.authService.updatePassword(this.userResetPasword).subscribe(
			res => {
				if(res.status == 200){
					this.spinnerService.hide();
					this.router.navigate(['/']);
					this.message.show("Password was successfully changed. Please try to login again.");					
				}
			},
			err => {
				this.spinnerService.hide();
				this.message.show(err.json().errors);
				this.router.navigate(['/']);
			}
			);
	}

}
