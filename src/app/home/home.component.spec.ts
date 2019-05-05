import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {CustomMaterialModule} from '../shared/material/material.module';
import {SharedModule} from '../shared/shared.module';
import {UrlShortenerService} from '../providers/url-shortener.service';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: UrlShortenerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CustomMaterialModule, SharedModule, HttpClientModule, BrowserAnimationsModule],
      providers: [UrlShortenerService],
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(UrlShortenerService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
