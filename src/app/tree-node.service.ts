import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TreeNodeService {
  constructor(private http: HttpClient) {}

  urlPackages: string = 'http://localhost:5000/packageResult';
  urlUsers: string = 'http://localhost:5000/packageResultChild';
  urlDocs: string = 'http://localhost:5000/documents';

  getPackages(): Observable<any> {
    return this.http.get<any>(this.urlPackages).pipe(map((e) => e[0]));
  }
  getUser() {
    return this.http.get<any>(this.urlUsers).pipe(map((d) => d[0]));
  }

  getDocs(id) {
    return this.http
      .get<any>(this.urlDocs)
      .pipe(map((d) => d.filter((e) => e.id == id)));
  }
}
