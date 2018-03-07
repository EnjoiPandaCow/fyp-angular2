import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';
import { tokenNotExpired} from "angular2-jwt";


@Injectable()
export class AuthService {

  domain = "http://localhost:8080";
  authToken;
  user;
  options;

  constructor( private http: Http) { }

  // Use this function to attach headers.
  createAuthenticationHeaders() {
    this.loadToken();

    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type' : 'application/json',
        'authorization' : this.authToken,
      })
    });
  }

  // Get the token from the browser
  loadToken() {
    this.authToken = localStorage.getItem('token');
  }

  // Passing the entire user object into the function.
  registerUser(user) {
    return this.http.post(this.domain + '/authentication/register', user).map(res => res.json());
  }

  checkUsername(username) {
    return this.http.get(this.domain + '/authentication/checkUsername' + username ).map(res => res.json());
  }

  checkEmail(email) {
    return this.http.get(this.domain + '/authentication/checkEmail' + email ).map(res => res.json());
  }

  login(user) {
    return this.http.post(this.domain + '/authentication/login', user).map(res => res.json());
  }

  getAllUsers() {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + '/authentication/allUsers', this.options).map(res => res.json());
  }

  getSingleUser(id) {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + '/authentication/singleUser/' + id, this.options).map(res => res.json());
  }

  editUser(user) {
    this.createAuthenticationHeaders();
    return this.http.put(this.domain + '/authentication/editUser/', user, this.options).map(res => res.json());
  }

  deleteUser(id) {
    this.createAuthenticationHeaders();
    return this.http.delete(this.domain + '/authentication/deleteUser/' + id, this.options).map(res => res.json());
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  // Stores the users token and their data in the browser
  storeUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  isAdmin() {
    if (localStorage.getItem("user") == null) {
      return null
    } else {

      let admin = localStorage.getItem("user");
      let jsonAdmin = JSON.parse(admin);

      if (jsonAdmin.admin === true) {
        return true
      } else {
        return false
      }
    }
  }

  getProfile() {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + '/authentication/profile', this.options).map(res => res.json());
  }

  loggedIn() {
    return tokenNotExpired();
  }

}
