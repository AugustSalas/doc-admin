import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { AppService } from '../_utils/services/app.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../_utils/services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  returnUrl: string;
  submitted = false;
  loading = false;
  error = '';

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private appService: AppService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'login-page');

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.authenticationService.logout();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  get formFields() {
    return this.loginForm.controls;
  }

  onSubmit() {
    
    this.submitted = true;

    // stop if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.router.navigate([this.returnUrl], { skipLocationChange: true });  

     this.authenticationService.login(this.formFields.username.value, this.formFields.password.value)
      .pipe(first())
      .subscribe(
        data => {

          this.router.navigate([this.returnUrl], { skipLocationChange: true }); 
                
          
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      ) 
  }

  logIn() {
    if (this.loginForm.valid) {
      this.appService.login();
    } else {
      this.toastr.error('Hello world!', 'Toastr fun!');
    }
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'login-page');
  }
}
