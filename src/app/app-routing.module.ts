import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import { QuestionsComponent } from './questions/questions.component';
import {ProfileComponent} from "./profile/profile.component";
import {ForgotpasswordComponent} from "./forgotpassword/forgotpassword.component";

import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
{
	path: '',
	component: HomeComponent,
	pathMatch: 'full'
},
{
	path: 'home',
	component: HomeComponent
},
{
	path: 'profile',
	component: ProfileComponent,
	canActivate: [AuthGuard]
},
{
	path: 'questions',
	component: QuestionsComponent,
	canActivate: [AuthGuard]
},
{
	path: 'forgotpassword',
	component: ForgotpasswordComponent
}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
