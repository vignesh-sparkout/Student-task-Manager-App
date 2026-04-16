import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../service/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  username = '';
  password = '';

  constructor(private auth: AuthService) {}

  login() {
    this.auth.login(this.username, this.password).subscribe({
      next: (res: any) => {
        alert(res.message); // interceptor response
      },
      error: (err: any) => {
        alert(err.message);
      }
    });
  }
}   