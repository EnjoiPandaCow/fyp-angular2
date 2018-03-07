import { Component, OnInit } from '@angular/core';
import { AuthService} from "../../../services/auth.service";
import { ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-delete-users',
  templateUrl: './delete-users.component.html',
  styleUrls: ['./delete-users.component.css']
})
export class DeleteUsersComponent implements OnInit {

  message;
  messageClass;
  foundUser = false;
  processing = false;
  reservation;
  currentUrl;

  constructor( private authService: AuthService, private activeRoute: ActivatedRoute, private router: Router) { }

  deleteUser() {
    this.processing = true;
    this.authService.deleteUser(this.currentUrl.id).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.router.navigate(['/users']);
        }, 2000);
      }
    });
  }

  ngOnInit() {
    this.currentUrl = this.activeRoute.snapshot.params;
    this.authService.getSingleUser(this.currentUrl.id).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.foundUser = true;
      }
    });
  }

}
