import { Injectable, OnInit } from '@angular/core';
import {Angular2TokenService} from "angular2-token";
import {Subject, Observable} from "rxjs";
import {Response} from "@angular/http";


@Injectable()
export class AuthService {

  userSignedIn$:Subject<boolean> = new Subject();

  userData:any;

  constructor(public authService:Angular2TokenService) {

    this.authService.validateToken().subscribe(
      res => res.status == 200 ? this.userSignedIn$.next(res.json().success) : this.userSignedIn$.next(false)
      )
    console.log(this.userData);
  }

  getUserName() {
    if (this.authService.currentUserData){
      this.userData = this.authService.currentUserData;
      return this.userData.name;
    }
    return false;
  }

  logOutUser():Observable<Response>{

    return this.authService.signOut().map(
      res => {
        this.userSignedIn$.next(false);
        return res;
      }
      );
  }

  registerUser(signUpData:  {email:string, password:string, passwordConfirmation:string}):Observable<Response>{
    return this.authService.registerAccount(signUpData).map(
      res => {
        this.userSignedIn$.next(true);
        return res
      }
      );
  }

  logInUser(signInData: {email:string, password:string}):Observable<Response>{

    return this.authService.signIn(signInData).map(
      res => {
        this.userData = JSON.parse(res.text()).data;
        this.userSignedIn$.next(true);
        return res
      }
      );

  }

  resetPassword(userEmail: string):Observable<Response>{
    return this.authService.resetPassword({
      email: userEmail,
    }).map(
    res =>  { 
      console.log(res);
      this.userSignedIn$.next(false);
      return res;
    })
  }

  updatePassword(userResetPasswordData: {
    password:string,
    passwordConfirmation:string,
    passwordCurrent: string,
    userType?: string,
    resetPasswordToken?: string})
  :Observable<Response>{
    return this.authService.updatePassword(userResetPasswordData).map(
      res =>  { 
        console.log(res);
        this.userSignedIn$.next(false);
        return res;
      })
  }

}