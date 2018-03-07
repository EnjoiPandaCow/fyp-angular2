import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { ReservationService } from "../../services/reservation.service";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  // Exporting variables to the HTML page.
  messageClass;
  message;
  newReservation = false;
  loadingReservations = false;
  form;
  username;
  processing = false;
  reservationPosts;

  constructor( private formBuilder: FormBuilder, private authService: AuthService, private reservationService: ReservationService) {
    this.createNewReservationForm();
  }

  createNewReservationForm() {
    this.form = this.formBuilder.group({
      facility: ['', Validators.compose([Validators.required])],
      date: ['', Validators.compose([Validators.required])],
      sTime: ['', Validators.compose([Validators.required])],
      eTime: ['', Validators.compose([Validators.required])]
    })
  }

  enableNewReservationForm() {
    this.form.get('facility').enable();
    this.form.get('date').enable();
    this.form.get('sTime').enable();
    this.form.get('eTime').enable();
  }

  disableNewReservationForm() {
    this.form.get('facility').disable();
    this.form.get('date').disable();
    this.form.get('sTime').disable();
    this.form.get('eTime').disable();
  }

  newReservationForm() {
    this.newReservation = true;
  }

  draftComment() {

  }

  onReservationSubmit() {
    this.processing = true;
    this.disableNewReservationForm();

    const reservation = {
      facility: this.form.get('facility').value,
      date: this.form.get('date').value,
      sTime: this.form.get('sTime').value,
      eTime: this.form.get('eTime').value,
      postedBy: this.username
    };

    this.reservationService.newReservation(reservation).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
        this.enableNewReservationForm();
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.getAllReservations();

        setTimeout(() => {
          this.newReservation = false;
          this.processing = false;
          this.message = false;
          this.form.reset();
          this.enableNewReservationForm();
          console.log()
        }, 2000);
      }
    });
  }

  goBack() {
    window.location.reload();
  }

  getAllReservations () {
    this.reservationService.getAllReservations().subscribe(data => {
      this.reservationPosts = data.reservations;
    })
  }

  reloadReservations() {
    this.loadingReservations = true;
    this.getAllReservations();
    setTimeout(() => {
      this.loadingReservations = false;
    }, 4000);
  }

  ngOnInit() {
    // When the component is initialized we get the users user name and assign it to a variable.
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username;
    });
    this.getAllReservations();
  }

}
