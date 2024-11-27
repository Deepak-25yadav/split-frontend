
import { Component } from '@angular/core';
import { faPlane, faHome, faHeart, faAsterisk } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  aeroplaneImage: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcRZzgudchwQMBtFrHXMrJACg442E2NPHYvsnoc0gJi2ZcPN6oCV41jNJrMYjgqt1aNgM&usqp=CAU';
  logoImage: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0BwhZmkvP4xDJr17gTAJ51RiUqu6bdWlDPw&s';


  faPlane = faPlane;
  faHome = faHome;
  faHeart = faHeart;
  faAsterisk = faAsterisk;

  redirectToSignup() {
    window.location.href = '/signup';
  }
}


