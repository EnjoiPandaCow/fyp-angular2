import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router} from "@angular/router";
import { AuthService} from "../../../services/auth.service";


@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {

  message;
  messageClass;
  user;
  processing = false;
  currentUrl;
  loading = true;

  constructor( private location: Location, private activatedRoute: ActivatedRoute, private authService: AuthService, private router: Router) { }

  updateUserSubmit() {
    this.processing = true;
    this.authService.editUser(this.user).subscribe(data => {
      if(!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.router.navigate(['/users']);
        }, 2000);
      }
    });
  }

  goBack() {
    this.location.back();
  }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params; // Grabbing ID from URL.
    this.authService.getSingleUser(this.currentUrl.id).subscribe(data => {
      if(!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      }
      else {
        this.user = data.user;
        this.loading = false;
      }
    });
  }
}
