import { Component, OnInit } from '@angular/core';
import { Location, DatePipe} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router'; // Allows us to grab the url.
import { JobService} from "../../../services/job.service";
import { AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css']
})
export class EditJobComponent implements OnInit {

  message;
  messageClass;
  job;
  pDate;
  dDate
  processing = false;
  currentUrl;
  loading = true;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private jobService: JobService,
    private datePipe: DatePipe,
    private router: Router,
    private authService: AuthService,
  ) { }

  updateJobSubmit() {
    this.processing = true;
    this.jobService.editJob(this.job).subscribe(data => {
      if(!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.router.navigate(['/jobs']);
        }, 2000);
      }
    });
  }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.jobService.getSingleJob(this.currentUrl.id).subscribe(data => {
      if(!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      }
      else {
        this.job = data.job;
        this.pDate = this.datePipe.transform(this.job.pDate, 'yyyy-MM-dd');
        this.dDate = this.datePipe.transform(this.job.dDate, 'yyyy-MM-dd');
        this.loading = false; // Enables the job form to be displayed.
      }
    });
  }

}
