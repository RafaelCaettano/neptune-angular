import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
	{ path: 'home', component: HomeComponent },
	{ path: 'news', component: NewsComponent },
	{ path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
