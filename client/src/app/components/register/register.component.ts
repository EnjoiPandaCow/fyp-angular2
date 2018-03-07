import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService} from "../../services/auth.service";
import { Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // Exporting the form of the form group type. Allows us to access it in register.components.html.
  form: FormGroup;
  message;
  messageClass;
  processing = false; // Used to determine when the form is processing.
  emailValid;
  emailMessage;
  usernameValid;
  usernameMessage;

  constructor( private formBuilder: FormBuilder, private authService: AuthService, private router: Router ) {
    // Calls the create form method when the component is constructed.
    this.createForm()
  }

  //Function that creates the form.
  createForm() {

    this.form = this.formBuilder.group({
      // Validators.required adds the required under the field.
      username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20), this.validateUsername])],
      email:    ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50), this.validateEmail])],
      fName:    ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(20), this.validateName])],
      lName:    ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30), this.validateName])],
      role:     ['', Validators.required],
      mobile:   ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(15), this.validateMobile])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(35), this.validatePassword])],
      confirm:  ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(35)])]
    }, { validator: this.matchingPasswords('password', 'confirm')} )
  }

  disableForm() {
    this.form.controls['username'].disable();
    this.form.controls['email'].disable();
    this.form.controls['fName'].disable();
    this.form.controls['lName'].disable();
    this.form.controls['role'].disable();
    this.form.controls['mobile'].disable();
    this.form.controls['password'].disable();
    this.form.controls['confirm'].disable();
  }

  enableForm() {
    this.form.controls['username'].enable();
    this.form.controls['email'].enable();
    this.form.controls['fName'].enable();
    this.form.controls['lName'].enable();
    this.form.controls['role'].enable();
    this.form.controls['mobile'].enable();
    this.form.controls['password'].enable();
    this.form.controls['confirm'].enable();
  }

  // Passing in controls which is part of the FormGroup
  validateEmail(controls) {
    const emailPattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    // If the test is true, meaning no error return null.
    if (emailPattern.test(controls.value)) {
      return null;
    // If the test fails then return an error.
    } else {
      return { 'validateEmail' : true}

    }
  }

  validateUsername(controls) {
    const usernamePattern = new RegExp(/^[a-zA-Z0-9]+$/);
    if (usernamePattern.test(controls.value)) {
      return null;
    } else {
      return { 'validateUsername' : true}
    }
  }

  validateName(controls) {
    const namePattern = new RegExp(/^[a-z ,.'-]+$/i);
    if (namePattern.test(controls.value)) {
      return null;
    } else {
      return { 'validateName' : true}
    }
  }

  validateMobile (controls) {
    const mobilePattern = new RegExp(/([+]?\d{1,2}[.-\s]?)?(\d{3}[.-]?){2}\d{4}/);
    if (mobilePattern.test(controls.value)) {
      return null;
    } else {
      return { 'validateMobile' : true}
    }
  }

  validatePassword (controls) {
    const passwordPattern = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
    if (passwordPattern.test(controls.value)) {
      return null;
    } else {
      return { 'validatePassword' : true}
    }
  }

  matchingPasswords(password, confirm) {
    // Returning a form group
    return (group: FormGroup) => {
      if(group.controls[password].value === group.controls[confirm].value) {
        return null;
      } else {
        return { 'matchingPasswords' : true }
      }
    }
  }

  onRegisterSubmit() {
    this.processing = true; // Setting to true.
    this.disableForm(); // Disabling user from editing fields after sub mission.
    // Building up the user object to send to the backend.
    const user = {
      username: this.form.get('username').value,
      email: this.form.get('email').value,
      fName: this.form.get('fName').value,
      lName: this.form.get('lName').value,
      role: this.form.get('role').value,
      mobile: this.form.get('mobile').value,
      password: this.form.get('password').value,
    };

    // Call in authService and the registerUser and taking in the data returned from the route.
    this.authService.registerUser(user).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000)
      }
    });
  }

  checkEmail() {
    this.authService.checkEmail(this.form.get('email').value).subscribe(data => {
      if(!data.success) {
        this.emailValid = false;
        this.emailMessage = data.message;
      } else {
        this.emailValid = true;
        this.emailMessage = data.message;
      }
    });
  }

  checkUsername() {
    this.authService.checkUsername(this.form.get('username').value).subscribe(data => {
      if(!data.success) {
        this.usernameValid = false;
        this.usernameMessage = data.message;
      } else {
        this.usernameValid = true;
        this.usernameMessage = data.message;
      }
    });
  }



  ngOnInit() {
  }

}
