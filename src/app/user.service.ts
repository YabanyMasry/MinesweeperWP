import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // Method to sign up a new user
  signUp(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, userData);
  }
}