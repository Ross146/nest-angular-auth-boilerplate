import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../app.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {
    this.submitted = false;
    this.error = '';
    this.returnUrl = '/auth/sign-in';
    this.signUpForm = this.formBuilder.group({
      username: ['ross146', Validators.required],
      email: ['padalk46@gmail.com', Validators.required],
      password: ['password', Validators.required]
    });
  }

  ngOnInit() {
    this.authService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/auth/sign-in';
  }

  get f() {
    return this.signUpForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signUpForm.invalid) {
      return;
    }

    this.authService.signUp({
      username: this.f.username.value,
      email: this.f.email.value,
      password: this.f.password.value
    })
      .pipe(first())
      .subscribe(data => {
        this.error = '';
        this.router.navigate([this.returnUrl]);
      }, error => {
        this.error = error;
      });
  }
}

