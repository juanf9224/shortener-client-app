import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {UrlShortenerService} from '../providers/url-shortener.service';
import {IUrl} from '../shared/model/url/url.model';
import {takeUntil} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';
import {DataSource} from '@angular/cdk/table';
import {Data} from '@angular/router';

@Component({
  selector: 'app-ranking-dashboard',
  templateUrl: './ranking-dashboard.component.html',
  styleUrls: ['./ranking-dashboard.component.scss']
})
export class RankingDashboardComponent implements OnInit, OnDestroy {
  title = 'Top 100 visited urls';
  destroyServices$: ReplaySubject<boolean> = new ReplaySubject(1);
  displayedColumns: string[] = ['no', 'url', 'title', 'visits', 'shortUrl', 'goTo'];
  dataSource: UrlDataSource;

  constructor(
    private shortenerService: UrlShortenerService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    console.log('ranking');
    this.loadAll();
  }

  loadAll(): void {
    this.shortenerService.topRanking()
      .pipe(takeUntil(this.destroyServices$))
      .subscribe(res => {
        this.dataSource = new UrlDataSource(res.body);
      });
  }

  goToShortenedUrlSite(shortUrl) {
    this.shortenerService.visitShortUrl(shortUrl)
      .pipe(takeUntil(this.destroyServices$))
      .subscribe(res => {
        this.loadAll();
        window.open(res.body.url);
      },
        (err: HttpErrorResponse) => {
          this.snackBar.open(`Could not open url: ${shortUrl} - error: ${err.message}`, 'Ok');
        });
  }

  // make sure to unsubscribe when component is destroyed
  @HostListener('window:beforeunload')
  ngOnDestroy(): void {
    this.destroyServices$.next(true);
    this.destroyServices$.complete();
  }

}

// DataSource to provide data that should be rendered in the table
export class UrlDataSource extends DataSource<IUrl> {
  // Stream of data provided to table
  data: BehaviorSubject<IUrl[]>;

  constructor(ds: IUrl[]) {
    super();
    this.data  = new BehaviorSubject<IUrl[]>(ds);
  }

  connect(): Observable<IUrl[]> {
    return this.data;
  }

  disconnect() {}
}
