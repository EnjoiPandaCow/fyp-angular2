import { Component, OnInit } from '@angular/core';
import { JobService} from "../../../services/job.service";
import { ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-delete-job',
  templateUrl: './delete-job.component.html',
  styleUrls: ['./delete-job.component.css']
})
export class DeleteJobComponent implements OnInit {

  message;
  messageClass;
  foundJob = false;
  processing = false;
  job;
  currentUrl;

  constructor(
    private jobService: JobService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) { }

  deleteJob() {
    this.processing = true;
    this.jobService.deleteJob(this.currentUrl.id).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.router.navigate(['/job']);
        }, 2000);
      }
    });
  }

  ngOnInit() {
    this.currentUrl = this.activeRoute.snapshot.params;
    this.jobService.getSingleJob(this.currentUrl.id).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.job = {
          title: data.job.title,
          description: data.job.description,
          size: data.job.size,
          pDate: data.job.pDate,
          pTime: data.job.pTime,
          pAddress: data.job.pAddress,
          dDate: data.job.dDate,
          dTime: data.job.dTime,
          dAddress: data.job.dAddress,
          postedOn: data.job.postedOn,
          postedBy: data.job.postedBy
        };
        this.foundJob = true;
      }
    });
  }

}
