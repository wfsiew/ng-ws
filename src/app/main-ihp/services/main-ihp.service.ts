import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainIhpService {

  private url = 'http://127.0.0.1/MyKAD/GetMyKAD?LoadPhoto=NO&VerifyFP=NO&Format=JSON'

  constructor(private http: HttpClient) { }

  getCardInfo() {
    return this.http.get(this.url);
  }
}
