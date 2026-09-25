import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

import { inject } from '@angular/core';
import { ToastService } from '../../shared/components/toast/toast.service';

export const globalErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        // case 400:  //global err we can take from api( business err)
        //   toast.error('Invalid request');
        //   break;

        case 401:
          toast.error('Your session has expired');
          break;
        case 403:
          toast.error('You are not allowed to perform this action');
          break;
        case 404:
          toast.error('Resource not found');
          break;
        case 500:
          toast.error('Something went wrong. Please try again later.');

          break;

        default:
          toast.error('An unexpected error occurred');
      }

      return throwError(() => error);
    }),
  );
};
