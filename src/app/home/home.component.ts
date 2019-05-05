import {Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {takeUntil} from 'rxjs/operators';
import {ReplaySubject} from 'rxjs';
import {NgForm} from '@angular/forms';

import {IUrl} from '../shared/model/url/url.model';
import {UrlShortenerService} from '../providers/url-shortener.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  destroyServices$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  @ViewChild('shortenForm') shortenForm: NgForm;
  loading: boolean;
  urlObj: IUrl = {};
  url = '';

  constructor(
    private shortenService: UrlShortenerService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.loading = true;
    console.log(this.url);
    // shorten typed url
    this.shortenService.shortenUrl(this.url)
      .pipe(takeUntil(this.destroyServices$))
      .subscribe(res => {
          this.snackBar.open(`The url was successfully shortened`, 'Ok', {duration: 4000});
          this.urlObj = res.body;
          this.shortenForm.resetForm();
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          this.snackBar.open(`Could not shorten url: ${this.url}`, 'Ok');
          console.log(`error: ${err.message}`);
          this.loading = false;
        });
  }

  // Redirect to shortened site
  goToShortenedUrlSite() {
    this.shortenService.visitShortUrl(this.urlObj.shortUrl)
      .pipe(takeUntil(this.destroyServices$))
      .subscribe(res => {
         window.open(res.body.url);
      });
  }

  // make sure to unsubscribe when component is destroyed
  @HostListener('window:beforeunload')
  ngOnDestroy(): void {
    this.destroyServices$.next(true);
    this.destroyServices$.complete();
  }

}
