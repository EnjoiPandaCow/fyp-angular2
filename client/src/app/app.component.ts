// Importing component module from angular.
import { Component } from '@angular/core';
import { SwPush, SwUpdate } from "@angular/service-worker";


@Component({
  // Tell html where to put that component.
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private swUpdate: SwUpdate) {

  }

  ngOnInit() {

    // Checking if a service worker is present.
    if(this.swUpdate.isEnabled) {
      // New version of application detection.
      this.swUpdate.available.subscribe(() => {
        if (confirm("New version of Shyft Available. Would you like to load it?")) {
          window.location.reload();
        }
      });
    }
  }
}
