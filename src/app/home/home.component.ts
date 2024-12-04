
import { Component, ChangeDetectorRef, OnInit } from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';

import { faPlane, faHome, faHeart, faAsterisk } from '@fortawesome/free-solid-svg-icons';

import { filter } from 'rxjs/operators';

import Swal from 'sweetalert2';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  aeroplaneImage: string =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcRZzgudchwQMBtFrHXMrJACg442E2NPHYvsnoc0gJi2ZcPN6oCV41jNJrMYjgqt1aNgM&usqp=CAU';

  logoImage: string =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0BwhZmkvP4xDJr17gTAJ51RiUqu6bdWlDPw&s';

  faPlane = faPlane;
  faHome = faHome;
  faHeart = faHeart;
  faAsterisk = faAsterisk;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.cdr.detectChanges();
      });
  }

  redirectToSignup(): void {
    this.router.navigate(['/signup']);
  }

  demoLogin(): void {

    const demoCredentials = {
      email: 'deepak1231@gmail.com',
      password: 'Deepak@123',
    };

    
    this.authService.loginUser(demoCredentials).subscribe({
      next: (response:any) => {
        Swal.fire({
          icon: 'success',
          title: 'Demo Login Successful',
          text: 'Welcome to the demo account!',
          timer: 2000,
          timerProgressBar: true,
        }).then(() => {
          this.authService.setToken(response.token);
          this.router.navigate(['/groups']);
        });
      },
      error: (error:any) => {
        Swal.fire({
          icon: 'error',
          title: 'Demo Login Failed',
          text: error.error.message || 'Something went wrong. Please try again.',
          timer: 3000,
          timerProgressBar: true,
        });
      },
    });
  }
}

