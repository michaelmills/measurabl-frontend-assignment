import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed, inject } from '@angular/core/testing';
import { Ages } from "../model/Ages";
import { Names } from "../model/Names";

import { MockMsrService } from './mock-msr.service';

describe('MockMsrService', () => {
  let httpMock: HttpTestingController;
  let service: MockMsrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: 'MOCK_API_URL', useValue: 'http://example.com' },
        MockMsrService
      ]
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(MockMsrService);
  });

  it('should be created', inject([MockMsrService], (service: MockMsrService) => {
    expect(service).toBeTruthy();
  }));

  it('should pull ages', () => {
    const age: Ages[] = [{id: "1", age: 22}, {id: "2", age: 55}];

    service.pullAges().subscribe(result => {
      expect(result.length > 0);
      expect(result).toEqual(age);
    });

    const req = httpMock.expectOne({
      method: "GET",
      url: "http://example.com/ages"
    });

    req.flush(age);
    httpMock.verify();
  });

  it('should pull names', () => {
    const names: Names[] = [{id: "1", firstName: "michael", lastName: "mills"}, {id: "2", firstName: "tom", lastName: "jones"}];

    service.pullNames().subscribe(result => {
      expect(result.length > 0);
      expect(result).toEqual(names);
    });

    const req = httpMock.expectOne({
      method: "GET",
      url: "http://example.com/names"
    });

    req.flush(names);
    httpMock.verify();
  });
});