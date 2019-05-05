import {Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {UrlShortenerService} from '../providers/url-shortener.service';
import {IUrl} from '../shared/model/url/url.model';
import {takeUntil} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {MatPaginator, MatSnackBar, MatTableDataSource} from '@angular/material';
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
  dataSource: MatTableDataSource<IUrl>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

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
        this.dataSource = new MatTableDataSource<IUrl>(res.body);
        this.dataSource.paginator = this.paginator;
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
