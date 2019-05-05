import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingDashboardComponent } from './ranking-dashboard.component';
import {CustomMaterialModule} from '../shared/material/material.module';
import {SharedModule} from '../shared/shared.module';
import {UrlShortenerService} from '../providers/url-shortener.service';
import {HttpClientModule} from '@angular/common/http';

describe('RankingDashboardComponent', () => {
  let component: RankingDashboardComponent;
  let fixture: ComponentFixture<RankingDashboardComponent>;
  let service: UrlShortenerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CustomMaterialModule, SharedModule, HttpClientModule],
      providers: [UrlShortenerService],
      declarations: [ RankingDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingDashboardComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(UrlShortenerService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
