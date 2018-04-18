import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from "@angular/forms";
import { ReactiveFormsModule} from "@angular/forms";
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService} from "./services/auth.service";
import { ReservationService} from "./services/reservation.service";
import { JobService} from "./services/job.service";
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FlashMessagesModule, FlashMessagesService} from "angular2-flash-messages";
import { AuthGuard } from "./guards/auth.guard";
import { NotAuthGuard } from "./guards/notAuth.guard";
import { ReservationComponent} from "./components/reservation/reservation.component";
import { EditReservationComponent } from './components/reservation/edit-reservation/edit-reservation.component';
import { DatePipe} from "@angular/common";
import { DeleteReservationComponent } from './components/reservation/delete-reservation/delete-reservation.component';
import { AdminComponent } from './components/admin/admin.component';
import { UsersComponent } from './components/users/users.component';
import { AdminGuard} from "./guards/admin.guard";
import { EditUsersComponent } from './components/users/edit-users/edit-users.component';
import { DeleteUsersComponent } from './components/users/delete-users/delete-users.component';
import { FooterComponent } from './components/footer/footer.component';
import { SmallFooterComponent } from './components/small-footer/small-footer.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CollapseModule} from "ngx-bootstrap";
import { JobComponent } from './components/job/job.component';
import { ViewJobComponent } from './components/job/view-job/view-job.component';
import { EditJobComponent } from './components/job/edit-job/edit-job.component';
import { DeleteJobComponent } from './components/job/delete-job/delete-job.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    ReservationComponent,
    EditReservationComponent,
    DeleteReservationComponent,
    AdminComponent,
    UsersComponent,
    EditUsersComponent,
    DeleteUsersComponent,
    FooterComponent,
    SmallFooterComponent,
    JobComponent,
    ViewJobComponent,
    EditJobComponent,
    DeleteJobComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    FlashMessagesModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    CollapseModule.forRoot(),
  ],
  providers: [
    [AuthService, AuthGuard, NotAuthGuard, AdminGuard, ReservationService, JobService, DatePipe],
    [FlashMessagesService]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
