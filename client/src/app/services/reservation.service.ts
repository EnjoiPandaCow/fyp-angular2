import { Injectable } from '@angular/core';
import { AuthService } from "./auth.service";
import { Http, Headers, RequestOptions } from "@angular/http";

@Injectable()
export class ReservationService {

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

  newReservation(reservation) {
    this.createAuthenticationHeaders();
    return this.http.post(this.domain + '/reservations/newReservation', reservation, this.options).map(res => res.json());
  }

  getAllReservations() {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + '/reservations/allReservations', this.options).map(res => res.json());
  }

  getSingleReservation(id) {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + '/reservations/singleReservation/' + id, this.options).map(res => res.json());
  }

  editReservation(reservation) {
    this.createAuthenticationHeaders();
    return this.http.put(this.domain + '/reservations/updateReservation/', reservation, this.options).map(res => res.json());
  }

  deleteReservation(id) {
    this.createAuthenticationHeaders();
    return this.http.delete(this.domain + '/reservations/deleteReservation/' + id, this.options).map(res => res.json());
  }

}
