
import { Component } from '@angular/core';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'split-frontend';

  isAuthenticated = false;

  constructor(private authService: AuthService) {

    this.authService.isAuth.subscribe((status) => {

      this.isAuthenticated = status;

    });
  }
}
