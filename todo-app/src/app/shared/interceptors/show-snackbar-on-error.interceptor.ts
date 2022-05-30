import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, throwError } from 'rxjs';

type ErrorResponse = {
  message: string;
  error: string;
  statusCode: number;
};

@Injectable({
  providedIn: 'root',
})
export class ShowSnackbarOnErrorInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<never>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError((err) => this.handleServerError(err)));
  }

  handleServerError(errorResponse: HttpErrorResponse): Observable<never> {
    const response: ErrorResponse = errorResponse.error;
    if (!errorResponse.ok && response?.message != null) {
      this.snackBar.open(response?.message);
    }

    return throwError(() => response);
  }
}
