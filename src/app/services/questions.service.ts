import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import {Subject, Observable} from "rxjs";
import { Response } from "@angular/http";
import {Angular2TokenService} from "angular2-token";
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras
}                           from '@angular/router';

import { environment } from '../../environments/environment'
import 'rxjs/add/operator/toPromise';

@Injectable()
export class QuestionsService {

  constructor(
    private http: Http,
    public authService:Angular2TokenService) { }

  getQuestion():Observable<Response>{
    return this.authService.get('/games/start_game')
    .map( res => {
      return res;
    });
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
}
