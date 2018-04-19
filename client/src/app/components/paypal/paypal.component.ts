import { Component, OnInit, AfterViewChecked } from '@angular/core';
import {Router} from "@angular/router";

declare let paypal: any;

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit, AfterViewChecked{

  constructor(private router: Router) { }

  addScript: boolean = false;
  paypalLoad: boolean = true;
  finalAmount: number = 0.01;

  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'AQyVIA2GaliE9MDyweYSUMlYQYWLFDqHWtIp7WejaRBleFGaUQ6urznP8aY7_szCjHJAK59f0N9NQSTs',
      production: '<your-production-key-here>'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.finalAmount, currency: 'EUR' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        setTimeout(() => {
          this.router.navigate(['/job']);
        }, 2000);
      })
    }
  };

  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, 'paypal-checkout-btn');
        this.paypalLoad = false;
      })
    }
  }

  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }



  ngOnInit() {
  }

}
