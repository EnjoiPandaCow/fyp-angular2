import { Injectable } from '@angular/core';
import { AuthService } from "./auth.service";
import { Http, Headers, RequestOptions } from "@angular/http";

@Injectable()
export class JobService {

  options;
  domain = this.authService.domain;

  constructor( private authService: AuthService, private http: Http) { }

  createAuthenticationHeaders() {
    this.authService.loadToken();

    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type' : 'application/json',
        'authorization' : this.authService.authToken,
      })
    });
  }

  newJob(job) {
    this.createAuthenticationHeaders();
    return this.http.post(this.domain + '/jobs/newJob', job, this.options).map(res => res.json());
  }

  getAllJobs() {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + '/jobs/allJobs', this.options).map(res => res.json());
  }

  getSingleJob(id) {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + '/jobs/singleJob/' + id, this.options).map(res => res.json());
  }

  editJob(job) {
    this.createAuthenticationHeaders();
    return this.http.put(this.domain + '/jobs/updateJob/', job, this.options).map(res => res.json());
  }

  deleteJob(id) {
    this.createAuthenticationHeaders();
    return this.http.delete(this.domain + '/jobs/deleteJob/' + id, this.options).map(res => res.json());
  }

  postComment(id, comment) {
    this.createAuthenticationHeaders();
    const jobData = {
      id: id,
      comment: comment
    }
    return this.http.post(this.domain + '/jobs/comment', jobData, this.options).map(res => res.json());
  }

}
