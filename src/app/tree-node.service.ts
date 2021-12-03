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

  getUsers(packId): Observable<TreeNode[]> {
    return this.http
      .get<TreeNode[]>(this.urlUsers)
      .pipe(map((el) => el.filter((u) => u.data.packageId === packId)));
  }

  getDocs(id): Observable<TreeNode[]> {
    return this.http
      .get<TreeNode[]>(this.urlDocs)
      .pipe(map((el) => el.filter((d) => d.data.useID === id)));
  }
}
