import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { LoginComponent } from './components/login/login.component';
import { DonationComponent } from './pages/donation/donation.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { TableProjectComponent } from './components/table-project/table-project.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    NavbarComponent,
    FooterComponent,
    ProjectsComponent,
    ProjectDetailComponent,
    LoginComponent,    
    DonationComponent,
    SignUpComponent, 
    ProfileComponent,
    AboutUsComponent, 
    TableProjectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
