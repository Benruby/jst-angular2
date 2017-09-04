import { Injectable } from '@angular/core';
import { Response } from "@angular/http";
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

		return this.authService.post('bug_report',
		{
			"g-recaptcha-response": reportData["g-recaptcha-response"],
			'bug_report': {
				user_name: reportData.user_name,
				email: reportData.email,
				content: reportData.content
			}
		})
		.toPromise()
		.then(response => response);
	}

}
