import { Component, OnInit } from '@angular/core';
import { AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username;
  email;
  fName;
  lName;
  role;
  mobile;

  constructor( private authService: AuthService) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      // Takes the user that we are getting returned and assigns it so we can use it inn the profile page.
      this.username = profile.user.username;
      this.email = profile.user.email;
      this.fName = profile.user.fName;
      this.lName = profile.user.lName;
      this.role = profile.user.role;
      this.mobile = profile.user.mobile;
    });
  }

}
