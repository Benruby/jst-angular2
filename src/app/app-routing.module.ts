import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import { GamesComponent } from './games/games.component';
import { QuestionsComponent } from './questions/questions.component';
import {ProfileComponent} from "./profile/profile.component";
import {ForgotpasswordComponent} from "./forgotpassword/forgotpassword.component";
import { SubmitQuestionComponent } from './components/submit-question/submit-question.component';
import {AuthGuard} from "./guards/auth.guard";
import {AnonUserGuard} from "./guards/anon.user.guard";
import { QAndAModeComponent } from './q-and-a-mode/q-and-a-mode.component';
import { GamesAsListComponent } from './games/games-as-list/games-as-list.component';

const routes: Routes = [
{
	path: '',
	redirectTo: 'home',
	pathMatch: 'full'
},
{ 
	path: 'home', 
	component: HomeComponent,
	canActivate: [AnonUserGuard] 
},
{
	path: 'games',
	// component: GamesComponent,
	component: GamesAsListComponent,
	canActivate: [AnonUserGuard]
	// canActivate: [AuthGuard]
},
{
	path: 'profile',
	component: ProfileComponent,
	canActivate: [AuthGuard]
},
{
	path: 'questions',
	component: QuestionsComponent,
	canActivate: [AnonUserGuard]
},
{
	path: 'questions/:game_name',
	component: QuestionsComponent,
	canActivate: [AnonUserGuard]
},
{
	path: 'forgotpassword',
	component: ForgotpasswordComponent
},
{
	path: 'learn/:game_name',
	component: QAndAModeComponent
},
{ 
	path: '**', 
	redirectTo: '/',
	pathMatch: 'full' 
}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
