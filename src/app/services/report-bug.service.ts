import { Injectable } from '@angular/core';
import { Response, RequestOptions } from "@angular/http";
import { Angular2TokenService } from "angular2-token";
import { Subject, Observable } from "rxjs";
import {
	CanActivate, Router,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	CanActivateChild,
	NavigationExtras
} from '@angular/router';

@Injectable()
export class ReportBugService {

	constructor(private authService:Angular2TokenService) { }

	reportBug(reportData:  {user_name?:string, email:string, content:string}):Promise<Response> {

		let requestOptions = new RequestOptions();
		requestOptions.body = {
			"g-recaptcha-response": reportData["g-recaptcha-response"]
		};

		return this.authService.post('bug_report', {"g-recaptcha-response": reportData["g-recaptcha-response"]})
		.toPromise()
		.then(response => response);
	}

}
