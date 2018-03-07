import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users;

  constructor(private authService: AuthService) { }

  getAllUsers() {
    this.authService.getAllUsers().subscribe(data => {
      this.users = data.users
    });
  }

  ngOnInit() {
    this.getAllUsers();
  }

}
