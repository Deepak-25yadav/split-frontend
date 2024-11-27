import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }

    this.loading = true;
    const userData = this.signupForm.value;

    this.authService.registerUser(userData).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Signup Successful',
          text: 'You can now log in!',
          timer: 2000,
          timerProgressBar: true,
        }).then(() => {
          this.router.navigate(['/login']);
        });
        this.loading = false;
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Signup Failed',
          text: error.error.message || 'Something went wrong. Please try again.',
          timer: 3000,
          timerProgressBar: true,
        });
        this.loading = false;
      }
    });
  }
}
