import { Component, OnInit } from '@angular/core';
import { Location, DatePipe} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router'; // Allows us to grab the url.
import { ReservationService} from "../../../services/reservation.service";
import { AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.css']
})
export class EditReservationComponent implements OnInit {

  message;
  messageClass;
  reservation;
  date;
  processing = false;
  currentUrl;
  loading = true;

  constructor( private location: Location, private activatedRoute: ActivatedRoute, private reservationService : ReservationService, private datePipe: DatePipe, private router: Router, private authService: AuthService ) { }

  updateReservationSubmit() {
    this.processing = true;
    this.reservationService.editReservation(this.reservation).subscribe(data => {
      if(!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.router.navigate(['/reservation']);
        }, 2000);
      }
    });
  }

  goBack() {
    this.location.back();
  }

  ngOnInit() {
    // Grabbing the ID from the Url.
    this.currentUrl = this.activatedRoute.snapshot.params;

    this.reservationService.getSingleReservation(this.currentUrl.id).subscribe(data => {
      if(!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      }
       else {
        this.reservation = data.reservation;
        this.date = this.datePipe.transform(this.reservation.date, 'yyyy-MM-dd');
        this.loading = false; // Enables the reservation form to be displayed.
      }
    });
  }

}
