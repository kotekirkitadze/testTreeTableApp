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
  files: TreeNode[];

  cols: any[];

  totalRecords: number;

  loading: boolean;

  constructor(private getDataService: TreeNodeService) {}
  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'size', header: 'Size' },
      { field: 'type', header: 'Type' },
    ];

    this.totalRecords = 1000;

    this.loading = true;
  }
  editDoc: boolean = false;
  loadNodes(event) {
    this.loading = true;
    this.getDataService.getPackages().subscribe((packages) => {
      this.files = packages.map((p) => {
        if (p.data['userNum'] >= 1) {
          return {
            ...p,
            leaf: false,
          };
        } else {
          return p;
        }
      });
      this.loading = false;
    });
  }

  onNodeExpand(event) {
    this.loading = true;

    let node = event.node;

    if (node.data['type'] == 'paketebi') {
      this.getDataService
        .getUsers(node.data['packageId'])
        .subscribe((users) => {
          node.children = users.map((user) => {
            if (user.data['documents'] >= 1) {
              return {
                ...user,
                leaf: false,
              };
            } else {
              return user;
            }
          });
          this.loading = false;
          this.files = [...this.files];
        });
    }

    if (node.data['type'] == 'usersType') {
      this.getDataService.getDocs(node.data['userID']).subscribe((docs) => {
        node.children = docs;
        this.loading = false;
        this.editDoc = true;
        this.files = [...this.files];
      });
    }
  }

  edit(e) {
    console.log('Document name:', e.name);
    console.log('Document"s userId', e.useID);
  }
}
