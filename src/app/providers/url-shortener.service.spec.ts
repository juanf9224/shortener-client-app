import { TestBed } from '@angular/core/testing';

import { UrlShortenerService } from './url-shortener.service';
import {HttpClientModule} from '@angular/common/http';

describe('UrlShortenerService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: UrlShortenerService = TestBed.get(UrlShortenerService);
    expect(service).toBeTruthy();
  });
});
