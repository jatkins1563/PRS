import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestLine } from './requestline.class';

@Injectable({
  providedIn: 'root'
})
export class RequestLineService {

  baseurl: string = "http://localhost:5000/api/requestlines"
  constructor(
    private http: HttpClient
  ) { }

  list(): Observable<RequestLine[]> {
    return this.http.get(`${this.baseurl}/`) as Observable<RequestLine[]>;
  }
  get(id: number): Observable<RequestLine> {
    return this.http.get(`${this.baseurl}/${id}`) as Observable<RequestLine>;
  }
  create(requestLine: RequestLine): Observable<RequestLine> {
    return this.http.post(`${this.baseurl}/${requestLine.requestId}`, requestLine) as Observable<RequestLine>;
  }
  change(requestLine: RequestLine): Observable<any> {
    return this.http.put(`${this.baseurl}/${requestLine.id}`, requestLine) as Observable<any>;
  }
  remove(requestLine: RequestLine): Observable<RequestLine> {
    return this.http.delete(`${this.baseurl}/${requestLine.id}`) as Observable<RequestLine>;
  }
}
