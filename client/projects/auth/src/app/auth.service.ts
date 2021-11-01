import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {JWT_LOCAL_STORAGE_KEY} from "../constants";
import {environment} from "../../../../src/environments/environment";

const {API_URL} = environment;

export interface ApplicationUser {
  accessToken: string;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<ApplicationUser | null>;
  public currentUser: Observable<ApplicationUser | null>;
  public readonly apiUrl: string

  constructor(private readonly http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<ApplicationUser | null>(
      JSON.parse(<string>localStorage.getItem(JWT_LOCAL_STORAGE_KEY))
    );
    this.currentUser = this.currentUserSubject.asObservable();
    this.apiUrl = API_URL
  }

  public get currentUserValue(): ApplicationUser | null {
    return this.currentUserSubject.value;
  }

  signIn(username: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/auth/sign-in`, { username, password }).pipe(
      map(data => {
        // login successful if there's a jwt token in the response
        if (data && data.accessToken) {
          // store; user; details; and; jwt; token in local
          // storage; to; keep; user; logged in between; page; refreshes;

          localStorage.setItem(JWT_LOCAL_STORAGE_KEY, JSON.stringify(data));
          this.currentUserSubject.next(data);
        }

        return data;
      })
    );
  }

  signUp({username, password, email}: {
    username: string,
    password: string,
    email: string
  }) {
    return this.http.post<any>(`${this.apiUrl}/auth/sign-up`, { username, email, password });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(JWT_LOCAL_STORAGE_KEY);
    this.currentUserSubject.next(null);
  }
}
