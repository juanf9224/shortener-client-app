import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {takeUntil} from 'rxjs/operators';
import {ReplaySubject} from 'rxjs';

import {IUrl} from '../shared/model/url/url.model';
import {UrlShortenerService} from '../providers/url-shortener.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  url: IUrl = {};
  destroyServices$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  constructor(
    private shortenService: UrlShortenerService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.url);
    // shorten typed url
    this.shortenService.shortenUrl(this.url)
      .pipe(takeUntil(this.destroyServices$))
      .subscribe(res => {
          this.snackBar.open(`The url was successfully shortened`, 'Ok');
          this.url = res.body;
        },
        err => {
          this.snackBar.open(`Could not shorten url: ${this.url.url} - error: ${err}`, 'Ok');
          console.log(err);
        });
  }

  goToShortenedUrlSite() {
    this.shortenService.visitShortUrl(this.url.shortUrl)
      .pipe(takeUntil(this.destroyServices$))
      .subscribe(res => {
        console.log(res);
        window.open(this.url.url);
      });
  }

  // make sure to unsubscribe when component is destroyed
  @HostListener('window:beforeunload')
  ngOnDestroy(): void {
    this.destroyServices$.next(true);
    this.destroyServices$.complete();
  }

}
