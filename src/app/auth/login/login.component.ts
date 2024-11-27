
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const credentials = this.loginForm.value;

    this.authService.loginUser(credentials).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'Welcome back!',
          timer: 2000,
          timerProgressBar: true,
        }).then(() => {
          this.authService.setToken(response.token);
          this.loading = false;

          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/groups';
          this.router.navigate([returnUrl]);
        });
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: error.error.message || 'Invalid login credentials.',
          timer: 3000,
          timerProgressBar: true,
        });
        this.loading = false;
      },
    });
  }
}

