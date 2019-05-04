import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {UrlShortenerService} from '../providers/url-shortener.service';
import {IUrl} from '../shared/model/url/url.model';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-ranking-dashboard',
  templateUrl: './ranking-dashboard.component.html',
  styleUrls: ['./ranking-dashboard.component.scss']
})
export class RankingDashboardComponent implements OnInit, OnDestroy {
  title = 'Top 100 visited urls';
  destroyServices$: ReplaySubject<boolean> = new ReplaySubject(1);
  urls: IUrl[];

  constructor(
    private shortenerService: UrlShortenerService
  ) { }

  ngOnInit() {
    console.log('ranking');
    this.loadAll();
  }

  loadAll(): void {
    this.shortenerService.topRanking()
      .pipe(takeUntil(this.destroyServices$))
      .subscribe(res => {
        this.urls = res.body;
        console.log(this.urls);
      });
  }

  goToShortenedUrlSite(shortUrl) {
    this.shortenerService.visitShortUrl(shortUrl)
      .pipe(takeUntil(this.destroyServices$))
      .subscribe(res => {
        console.log(res);
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
