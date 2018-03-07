import { Component, OnInit } from '@angular/core';
import { ReservationService } from "../../../services/reservation.service";
import { ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-delete-reservation',
  templateUrl: './delete-reservation.component.html',
  styleUrls: ['./delete-reservation.component.css']
})
export class DeleteReservationComponent implements OnInit {

  message;
  messageClass;
  foundReservation = false;
  processing = false;
  reservation;
  currentUrl;

  constructor( private reservationService: ReservationService, private activeRoute: ActivatedRoute, private router: Router) { }

  deleteReservation() {
    this.processing = true;
    this.reservationService.deleteReservation(this.currentUrl.id).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.router.navigate(['/reservation']);
        }, 2000);
      }
    });
  }

  ngOnInit() {

    this.currentUrl = this.activeRoute.snapshot.params;
    this.reservationService.getSingleReservation(this.currentUrl.id).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.reservation = {
          facility: data.reservation.facility,
          data: data.reservation.date,
          sTime: data.reservation.sTime,
          eTime: data.reservation.eTime,
          postedBy: data.reservation.postedBy,
          postedOn: data.reservation.postedOn,
          approved: data.reservation.approved,
        };
        this.foundReservation = true;
      }
    });
  }

}
