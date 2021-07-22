import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Request } from './request.class';
import { User } from '../user/user.class';
import { SystemService } from '../core/system.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  loggedInUser: User = this.syssvc.getLoggedInUser();

  baseurl: string = "http://localhost:5000/api/requests"
  constructor(
    private http: HttpClient,
    private syssvc: SystemService
  ) { }


  list(): Observable<Request[]> {
    return this.http.get(`${this.baseurl}`) as Observable<Request[]>;
  }
  getReviews(user: User): Observable<Request[]> {
    return this.http.get(`${this.baseurl}/${user.id}/review`) as Observable<Request[]>;
  }
  get(id: number): Observable<Request> {
    return this.http.get(`${this.baseurl}/${id}`) as Observable<Request>;
  }
  create(request: Request): Observable<Request> {
    return this.http.post(`${this.baseurl}`, request) as Observable<Request>;
  }
  change(request: Request): Observable<any> {
    return this.http.put(`${this.baseurl}/${request.id}`, request) as Observable<any>;
  }
  remove(request: Request): Observable<Request> {
    return this.http.delete(`${this.baseurl}/${request.id}`) as Observable<Request>;
  }
  review(request: Request): Observable<any> {
    return this.http.put(`${this.baseurl}/${this.loggedInUser.id}/review/${request.id}`, request) as Observable<any>;
  }
  approve(request: Request): Observable<any> {
    return this.http.put(`${this.baseurl}/${this.loggedInUser.id}/approve/${request.id}`, request) as Observable<any>;
  }
  reject(request: Request): Observable<any> {
    return this.http.put(`${this.baseurl}/${this.loggedInUser.id}/reject/${request.id}`, request) as Observable<any>;
  }
}
