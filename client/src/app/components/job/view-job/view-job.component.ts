import { Component, OnInit } from '@angular/core';
import { AuthService} from "../../../services/auth.service";
import { JobService } from "../../../services/job.service";
import { ActivatedRoute, Router } from '@angular/router'; // Allows us to grab the url.

@Component({
  selector: 'app-view-job',
  templateUrl: './view-job.component.html',
  styleUrls: ['./view-job.component.css']
})
export class ViewJobComponent implements OnInit {

  currentUrl;
  job;

  constructor( private authService: AuthService, private jobService: JobService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // Grabbing the ID from the Url.
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.jobService.getSingleJob(this.currentUrl.id).subscribe(data => {
      this.job = data.job
    });
  }

}
