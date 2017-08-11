import { Injectable } from '@angular/core';
import { Observable} from "rxjs";
import {CanActivate, Router, ActivatedRouteSnapshot} from "@angular/router";
import {Angular2TokenService} from "angular2-token";
import { Utils } from '../Utils/utils';
import { globals } from 'environments/environment';
import { AnonUserService } from 'app/services/anon-user.service';

@Injectable()
export class AnonUserGuard implements CanActivate {

  constructor(
    private authTokenService:Angular2TokenService,
    private router:Router,
    private anonService: AnonUserService){}

  canActivate(route: ActivatedRouteSnapshot) : Observable<boolean>|Promise<boolean>|boolean {
    
    if(this.authTokenService.userSignedIn() ||
       this.anonService.checkIfAnonUserIsSet()){
      return true;
    } else {
      Utils.setAnonToken();
    }

    /**
     * if the requested url is different from root, then navigate
     * after creating the token.
     * @param {[type]} route.url[0].path !== '/' [description]
     */
    if (route.url[0].path !== '/') {
      return true;
    }
    this.router.navigate(['/']);
    return false;
    
  }

}