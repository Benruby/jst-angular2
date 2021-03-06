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
import 'rxjs/add/operator/delay';

@Injectable()
export class QuestionsService {

  constructor(
    private http: Http,
    public authService:Angular2TokenService,
    private spinnerService: SpinnerService) { }

  getQuestion():Observable<Response>{
    // this.spinnerService.show();
    return this.authService.get('/games/get_question')
    .map( res => {
      // this.spinnerService.hide()
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

  getQuestionAnswer(questionId: any):Promise<Response> {

    let requestOptions = new RequestOptions();
    requestOptions.body = {
      question_id: questionId
    };

    return this.authService.get('games/get_question_answer', {search: requestOptions})
    .toPromise()
    .then(response => response);

  }

  /**
   * the method returns all questions of a complete game
   * @param {string} gameName [game name, to be returned from db.]
   */
   getGameQuestions(gameName: string){

     let requestOptions = new RequestOptions();
     requestOptions.body = {
       game_name: gameName
     };
     return this.authService.get('questions/get_qestions_by_game', {search: requestOptions})
     .toPromise()
     .then(response => response);
   }
 }
