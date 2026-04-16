import { HttpInterceptorFn } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { CookieService } from '../service/cookie.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('token');
  //  const cookie= inject(CookieService)
  // const token = cookie.get('token');
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};