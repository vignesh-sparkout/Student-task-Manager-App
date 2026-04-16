import { Component } from '@angular/core';
import { AuthService } from '../service/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent {

  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}