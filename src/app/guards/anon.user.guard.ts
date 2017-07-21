import { Injectable }     from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {Angular2TokenService} from "angular2-token";
import { Utils } from '../Utils/utils';
import { anon_token } from 'environments/environment';

@Injectable()
export class AnonUserGuard implements CanActivate {

  constructor(private authTokenService:Angular2TokenService,
    private router:Router){}

  canActivate() {
    if(this.authTokenService.userSignedIn() || anon_token){
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
    
  }

}