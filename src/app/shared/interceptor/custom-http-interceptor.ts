import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomHttpInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        map((event: HttpEvent<any>) => this.handleResponse(event)),
        catchError((error: HttpErrorResponse) => this.handleErrors(error))
      );
  }

  private handleResponse(event: HttpEvent<any>): HttpEvent<any> {
    const response = event as HttpResponse<any> || null;
    console.log(`response received ${response.status}`);
    if (response.status === 301 || response.status === 302 || response.status === 307) {
      console.log('redirect');
      window.location.href = response.body.url;
      return response;
    }
    return event;
  }

  private handleErrors(error: HttpErrorResponse): Observable<any> {
      return throwError(error);
  }

}
