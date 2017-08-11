import { Injectable } from '@angular/core';
import {AuthService} from "../services/auth/auth.service";


@Injectable()
export class AnonUserService {

  constructor(public authService:AuthService) { }

  checkIfAnonUserIsSet() {
  	if (!localStorage.getItem('anon_user_token')) {
  		return false;
  	}
  	return true;
  }

}
