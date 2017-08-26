import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import {Subject, Observable} from "rxjs";
import { Response } from "@angular/http";
import { Angular2TokenService } from "angular2-token";
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras
} from '@angular/router';

import 'rxjs/add/operator/toPromise';
import { SpinnerService } from 'app/components/spinner/spinner.service';


@Injectable()
export class QuestionsService {

  constructor(
    private http: Http,
    public authService:Angular2TokenService,
    private spinnerService: SpinnerService) { }

  getQuestion():Observable<Response>{
    this.spinnerService.show();
    let response = this.authService.get('/games/get_question')
    .map( res => {
      return res;
    });
    this.spinnerService.hide();
    return response;
  }

  answerQuestion(questionId: any, answerId: any):Promise<Response>{

    let requestOptions = new RequestOptions();
    requestOptions.body = {
      question_id: questionId,
      answer_id: answerId
    };
  

    return this.authService.get('games/answer_question', {search: requestOptions})
    .toPromise()
    .then(response => response);
  }

  getQuestionAnswer(questionId: any):Promise<Response> {

    let requestOptions = new RequestOptions();
    requestOptions.body = {
      question_id: questionId
    };

     return this.authService.get('games/get_question_answer', {search: requestOptions})
    .toPromise()
    .then(response => response);

  }
}
