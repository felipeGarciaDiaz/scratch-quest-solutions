import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CmsService {

  private apiUrl = 'http://74.207.227.76:1337/api/site-subtitle';
  private apiUrl2 = 'http://74.207.227.76:1337/api/site-contents';

  constructor(private http: HttpClient) { }

  getMultiContent(): Observable<any> {
    return this.http.get(this.apiUrl2);
  }
  getContent(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
