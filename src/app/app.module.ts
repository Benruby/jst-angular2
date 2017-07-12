import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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

import {AuthService} from "./services/auth/auth.service";
import { QuestionsService } from "./services/questions.service"
import { ProfileComponent } from './profile/profile.component';

import {AuthGuard} from "./guards/auth.guard";
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';

import { JsHighlight } from './directives/highlight/js.highlight.directive';

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
	JsHighlight
	],
	imports: [
	BrowserModule,
	AppRoutingModule,
	MaterializeModule,
	HttpModule,
	FormsModule
	],
	providers: [
	Angular2TokenService,
	AuthService,
	QuestionsService,
	AuthGuard
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
