import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { JobService } from "../../services/job.service";

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {

  // Exporting variables to the HTML page.
  messageClass;
  message;
  newJob = false;
  loadingJobs = false;
  form;
  username;
  processing = false;
  jobPosts;


  public size = [
    {value: 'big', display: 'Big'},
    {value: 'small', display:'Small'}
  ];

  constructor( private formBuilder: FormBuilder, private authService: AuthService, private jobService: JobService) {
    this.createNewJobForm();
  }

  createNewJobForm() {
    this.form = this.formBuilder.group( {
      title: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      size: ['', Validators.compose([Validators.required])],
      pDate: ['', Validators.compose([Validators.required])],
      pTime: ['', Validators.compose([Validators.required])],
      pAddress: ['', Validators.compose([Validators.required])],
      dDate: ['', Validators.compose([Validators.required])],
      dTime: ['', Validators.compose([Validators.required])],
      dAddress: ['', Validators.compose([Validators.required])],
    });
  }

  enableNewJobForm() {
    this.form.get('title').enable();
    this.form.get('description').enable();
    this.form.get('size').enable();
    this.form.get('pDate').enable();
    this.form.get('pTime').enable();
    this.form.get('pAddress').enable();
    this.form.get('dDate').enable();
    this.form.get('dTime').enable();
    this.form.get('dAddress').enable();
  }

  disableNewJobForm() {
    this.form.get('title').disable();
    this.form.get('description').disable();
    this.form.get('size').disable();
    this.form.get('pDate').disable();
    this.form.get('pTime').disable();
    this.form.get('pAddress').disable();
    this.form.get('dDate').disable();
    this.form.get('dTime').disable();
    this.form.get('dAddress').disable();
  }

  newJobForm() {
    this.newJob = true;
  }

  onJobSubmit() {
    this.processing = true;
    this.disableNewJobForm();

    const job = {
      title: this.form.get('title').value,
      description: this.form.get('description').value,
      size: this.form.get('size').value,
      pDate: this.form.get('pDate').value,
      pTime: this.form.get('pTime').value,
      pAddress: this.form.get('pAddress').value,
      dDate: this.form.get('dDate').value,
      dTime: this.form.get('dTime').value,
      dAddress: this.form.get('dAddress').value,
      postedBy: this.username
    };

    this.jobService.newJob(job).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
        this.enableNewJobForm();
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.getAllJobs();

        setTimeout(() => {
          this.newJob = false;
          this.processing = false;
          this.message = false;
          this.form.reset();
          this.enableNewJobForm();
        }, 2000);
      }
    });
  }

  getAllJobs () {
    this.jobService.getAllJobs().subscribe(data => {
      this.jobPosts = data.jobs;
    });
  }

  reloadJobs() {
    this.loadingJobs = true;
    this.getAllJobs();
    setTimeout(() => {
      this.loadingJobs = false;
    }, 4000);
  }


  ngOnInit() {
    // When the component is initialized we get the users user name and assign it to a variable.
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username;
    });
    this.getAllJobs();
  }
}
