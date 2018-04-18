import { Component, OnInit } from '@angular/core';
import { AuthService} from "../../../services/auth.service";
import { JobService } from "../../../services/job.service";
import { ActivatedRoute, Router } from '@angular/router'; // Allows us to grab the url.
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-job',
  templateUrl: './view-job.component.html',
  styleUrls: ['./view-job.component.css']
})
export class ViewJobComponent implements OnInit {

  currentUrl;
  job;
  commentForm;
  messageClass;
  message;
  newComment = [];
  enabledComments = [];
  processing = false;

  constructor( private authService: AuthService,
               private jobService: JobService,
               private activatedRoute: ActivatedRoute,
               private formBuilder: FormBuilder
  ) {
    this.createCommentForm();
  }

  createCommentForm() {
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(200)
      ])]
    })
  }

  enableCommentForm() {
    this.commentForm.get('comment').enable();
  }

  disableCommentForm() {
    this.commentForm.get('comment').disable();
  }


// Function to post a new comment on blog post
  draftComment(id) {
    this.commentForm.reset(); // Reset the comment form each time users starts a new comment
    this.newComment = []; // Clear array so only one post can be commented on at a time
    this.newComment.push(id); // Add the post that is being commented on to the array
  }

  cancelSubmission(id) {
    const index = this.newComment.indexOf(id);
    this.newComment.splice(index, 1);
    this.commentForm.reset();
    this.enableCommentForm();
    this.processing = false;
  }

  postComment(id) {
    this.disableCommentForm();
    this.processing = true;
    const comment = this.commentForm.get('comment').value;
    this.jobService.postComment(id, comment).subscribe(data => {
      this.getJob();
      const index = this.newComment.indexOf(id);
      this.newComment.splice(index, 1);
      this.enableCommentForm();
      this.commentForm.reset();
      this.processing = false;
      if (this.enabledComments.indexOf(id) < 0) this.expand(id);
    });
  }

  expand(id) {
    this.enabledComments.push(id);
  }

  collapse(id) {
    const index = this.enabledComments.indexOf(id);
    this.enabledComments.splice(index, 1);
  }

  getJob() {
    this.jobService.getSingleJob(this.currentUrl.id).subscribe(data => {
      this.job = data.job;
    });
  }

  ngOnInit() {
    // Grabbing the ID from the Url.
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.jobService.getSingleJob(this.currentUrl.id).subscribe(data => {
      this.job = data.job
    });
  }

}
