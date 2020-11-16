import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component'
import { NotFoundComponent } from './pages/not-found/not-found.component'
import { ProjectsComponent } from './pages/projects/projects.component'
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component'
import { ProfileComponent } from './pages/profile/profile.component'
import { DonationComponent } from './pages/donation/donation.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'donation/:id', component: DonationComponent },
  { path: 'registry', component: SignUpComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', pathMatch: 'full', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
