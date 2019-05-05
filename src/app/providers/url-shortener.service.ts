import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUrl} from '../shared/model/url/url.model';

@Injectable({
  providedIn: 'root'
})
export class UrlShortenerService {
  private resourceUrl = environment.baseApisUrl + 'api/v1/url';

  constructor(private http: HttpClient) { }

  shortenUrl(param: string): Observable<HttpResponse<IUrl>> {
    return this.http.post<IUrl>(`${this.resourceUrl}/shorten`, { url: param }, { observe: 'response' });
  }

  visitShortUrl(shortUrl: string): Observable<HttpResponse<IUrl>> {
    return this.http.get<IUrl>(`${this.resourceUrl}/visit/${shortUrl}`, { observe: 'response' });
  }

  topRanking(): Observable<HttpResponse<IUrl[]>> {
    return this.http.get<IUrl[]>(`${this.resourceUrl}/findTop`, { observe: 'response' });
  }
}
