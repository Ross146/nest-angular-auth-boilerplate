import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../app.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
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
    this.returnUrl = '';
    this.loginForm = this.formBuilder.group({
      username: ['ross146', Validators.required],
      password: ['password', Validators.required]
    });
  }

  ngOnInit() {
    this.authService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/test';
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.signIn(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(data => {
        this.error = '';
        this.router.navigate([this.returnUrl]);
      }, error => {
        console.log('error', error);
        this.error = error;
      });
  }
}

