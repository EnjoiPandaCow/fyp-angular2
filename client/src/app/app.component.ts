// Importing component module from angular.
import { Component } from '@angular/core';


@Component({
  // Tell html where to put that component.
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hello World From Angular 2';
}
