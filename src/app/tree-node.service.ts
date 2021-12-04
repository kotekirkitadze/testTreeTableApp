import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TreeNodeService {
  constructor(private http: HttpClient) {}

  urlPackages: string = 'http://localhost:5000/packages';
  urlUsers: string = 'http://localhost:5000/users';
  urlDocs: string = 'http://localhost:5000/documents';

  getPackages(): Observable<TreeNode[]> {
    return this.http.get<TreeNode[]>(this.urlPackages);
  }
  getUser() {
    return this.http.get<any>(this.urlUsers);
    // .pipe(map((d) => d.filter((e) => e.id == id)));
  }
}
