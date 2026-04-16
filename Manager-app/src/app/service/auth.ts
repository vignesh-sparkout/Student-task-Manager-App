import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) {}

login(username: string, password: string) {
  return this.http.post('/login', { username, password });
}

logout() {
  localStorage.removeItem('token');
  this.router.navigate(['/login']);
}

isLoggedIn(): boolean {
  return !!localStorage.getItem('token');
}
}