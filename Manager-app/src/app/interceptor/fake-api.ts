import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

export const fakeApi: HttpInterceptorFn = (req, next) => {

  let users = JSON.parse(localStorage.getItem('users') || '[]');

  // create default userx
  if (users.length === 0) {
    users = [{ username: 'vicky', password: '1234' }];
    localStorage.setItem('users', JSON.stringify(users));
  }

  // LOGIN API
  if (req.url.endsWith('/login') && req.method === 'POST') {
    const { username, password } = req.body as any;

    const user = users.find(
      (x: any) => x.username === username && x.password === password
    );

    if (user) {
 const fakeToken = 'jwt-token-123456'; //  FAKE TOKEN

    localStorage.setItem('token', fakeToken);
      return of(
        new HttpResponse({
          status: 200,
          body: { message: 'Login success ' }
        })
      ).pipe(delay(1000));
    } else {
      return throwError(() => ({
        status: 401,
        message: 'Invalid credentials'
      }));
    }
  }

  return next(req);
};