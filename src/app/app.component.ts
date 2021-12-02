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
    // this.getDataService.getData().subscribe((d) => (this.files = d));
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'size', header: 'Size' },
      { field: 'type', header: 'Type' },
    ];

    //in a production application, retrieve the logical number of rows from a remote datasource
    this.totalRecords = 1000;

    this.loading = true;
  }
  editDoc: boolean = false;
  loadNodes(event) {
    this.loading = true;

    this.getDataService.getPackages().subscribe((d) => {
      this.files = d
        .filter((e) => e.data['userNum'] >= 1)
        .map((d) => {
          return {
            ...d,
            leaf: false,
          };
        });
      this.loading = false;
    });
  }

  onNodeExpand(event) {
    this.loading = true;

    console.log(event);

    let node = event.node;
    console.log(node.data['PackageId']);

    console.log(node.data['type']);
    if (event.node.data['type'] == 'paketebi') {
      this.getDataService
        .getUsers(node.data['PackageId'])
        .subscribe((users) => {
          node.children = users
            .filter((user) => user.data['documents'] >= 1)
            .map((user) => {
              return {
                ...user,
                leaf: false,
              };
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
