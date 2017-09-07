import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { UrlSerializer, DefaultUrlSerializer } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MaterializeModule } from 'angular2-materialize';
import { Angular2TokenService } from 'angular2-token';
import { HttpModule } from '@angular/http';
import { HomeComponent } from './home/home.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';

import { FormsModule }   from '@angular/forms';
import { QuestionsComponent } from './questions/questions.component';

// import {AuthService} from "./services/auth/auth.service";
import { QuestionsService } from "./services/questions.service"
import { GamesService } from './services/games.service';
import { ProfileComponent } from './profile/profile.component';

import {AuthGuard} from "./guards/auth.guard";
import {AnonUserGuard} from "./guards/anon.user.guard";

import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';

import { JsHighlight } from './directives/highlight/js.highlight.directive';
import { GamesComponent } from './games/games.component';
import { FinishedGameDialogComponent } from './dialogs/finished-game-dialog/finished-game-dialog.component';
import { FinishedGameComponent } from './finished-game/finished-game.component';

import { GameResult } from './interfaces/game-result';
import { UserDropDownComponent } from './components/user-drop-down/user-drop-down.component';
import { CloseOnClickDirective } from './directives/close-on-click/close-on-click.directive';
import { SubmitQuestionComponent } from './components/submit-question/submit-question.component';

import { RecaptchaNoFormsModule } from 'ng2-recaptcha/ng2-recaptcha.noforms';
import { ReportBugComponent } from './dialogs/report-bug/report-bug.component';
import { ReportBugService } from './services/report-bug.service';
import { Utils } from './Utils/utils';
import { CustomUrlSerializer } from './Utils/custom-url-serializer/custom-url-serializer';
import { AnonUserService } from './services/anon-user.service';
import { BringToTopComponent } from './components/bring-to-top/bring-to-top.component';

import { WindowRef } from 'app/services/windowRef/window-ref';
import { ConfigService } from './config/config';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SpinnerService } from './components/spinner/spinner.service';
import { MessageSystemComponent } from './components/message-system/message-system.component';
import { MessageSystemService } from './components/message-system/message-system.service';
import { QAndAModeComponent } from './q-and-a-mode/q-and-a-mode.component';
import { SelectGameComponent } from './q-and-a-mode/select-game/select-game.component';


@NgModule({
	declarations: [
	AppComponent,
	HomeComponent,
	ToolbarComponent,
	AuthDialogComponent,
	LoginFormComponent,
	RegisterFormComponent,
	QuestionsComponent,
	ProfileComponent,
	ForgotpasswordComponent,
	JsHighlight,
	GamesComponent,
	FinishedGameDialogComponent,
	FinishedGameComponent,
	UserDropDownComponent,
	CloseOnClickDirective,
	SubmitQuestionComponent,
	ReportBugComponent,
	BringToTopComponent,
	SpinnerComponent,
	MessageSystemComponent,
	QAndAModeComponent,
	SelectGameComponent
	],
	imports: [
	BrowserModule,
	AppRoutingModule,
	MaterializeModule,
	HttpModule,
	FormsModule,
	CoreModule,
	BrowserAnimationsModule,
	RecaptchaNoFormsModule.forRoot()
	],
	providers: [
	Angular2TokenService,
	QuestionsService,
	GamesService,
	AuthGuard,
	AnonUserGuard,
	ReportBugService,
	Utils,
	AnonUserService,
	WindowRef,
	ConfigService,
	SpinnerService,
	MessageSystemService,
	DefaultUrlSerializer,
	[{ provide: UrlSerializer, useClass: CustomUrlSerializer }],
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
