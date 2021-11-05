import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Ages } from "../model/Ages";
import { Names } from "../model/Names";

@Injectable({
  providedIn: 'root'
})
export class MockMsrService {

  constructor(private httpClient: HttpClient, @Inject('MOCK_API_URL') private apiUrl) { }

  pullAges(): Observable<Array<Ages>> {
    return this.httpClient.get<Array<Ages>>(`${this.apiUrl}/ages`);
  }

  pullNames(): Observable<Array<Names>> {
    return this.httpClient.get<Array<Names>>(`${this.apiUrl}/names`);
  }
}
