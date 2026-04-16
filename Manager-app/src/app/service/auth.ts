import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
// import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient, /*private cookie:CookieService*/) {}

login(username: string, password: string) {
  return this.http.post('/login', { username, password });
}

logout() {
    //  this.cookie.delete('token');
  localStorage.removeItem('token');
  this.router.navigate(['/login']);
}

isLoggedIn(): boolean {
  return !!localStorage.getItem('token');
      // return !!this.cookie.get('token');


}
}