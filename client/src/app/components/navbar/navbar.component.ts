import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router} from "@angular/router";
import { FlashMessagesService} from "angular2-flash-messages";
import { CollapseModule} from "ngx-bootstrap";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( public authService: AuthService, private router: Router, private flashMessagesService: FlashMessagesService ) { }

  isCollapsed: boolean = true;

  collapsed(event: any): void {
    console.log(event);
  }

  expanded(event: any): void {
    console.log(event);
  }

  onLogoutClick() {
    this.authService.logout();
    this.flashMessagesService.show('You are logged out', { cssClass: 'alert-info' });
    this.router.navigate(['/']);
  }

  ngOnInit() {
  }

}
