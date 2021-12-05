import { Component, OnInit } from '@angular/core';
import { TreeNodeService } from './tree-node.service';

export interface TreeNode {
  data?: any;
  children?: TreeNode[];
  leaf?: boolean;
  expanded?: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private getDataService: TreeNodeService) {}
  loaded = false;
  users: TreeNode[] = [];
  ngOnInit() {
    this.getDataService.getPackages().subscribe((packages) => {
      this.loaded = true;
      this.users = packages.map((p) => {
        return {
          data: p,
          leaf: !!p['user'] ? true : false,
        };
      });
    });
  }

  handleExpand(p) {
    this.getDataService.getUser(p.data.id).subscribe((users) => {
      this.users = this.users.map((e) => {
        if (e.data.id == p.data.id) {
          return {
            ...e,
            children: users.map((u) => ({ data: u, leaf: !!u.documents })),
            expanded: true,
          };
        } else {
          return e;
        }
      });

      this.users = [...this.users];
      console.log(this.users);
    });
  }
}
