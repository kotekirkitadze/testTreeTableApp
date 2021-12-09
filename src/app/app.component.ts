import { Component, OnInit } from '@angular/core';
import { TreeNodeService } from './tree-node.service';

export interface TreeNode {
  data?: any;
  children?: TreeNode[];
  leaf?: boolean;
  expanded?: boolean;
  filterTypes?: FilterTypes[];
}

export interface FilterTypes {
  header: string;
  filterType: string;
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

  o = [
    {
      header: 'clientName',
      filterType: 'text',
    },
    {
      header: 'clientNumber',
      filterType: 'number',
    },
  ];

  ngOnInit() {
    this.getDataService.getPackages().subscribe((packages) => {
      this.loaded = true;
      this.users = packages.result.map((p) => {
        return {
          data: {
            clientName: p.clientName,
            clientNumber: p.clientNumber,
          },
          leaf: true,
          filterTypes: this.o,
        };
      });
    });
  }

  handleExpand(p) {
    if (!p.expanded && !p.children) {
      this.getDataService.getUser().subscribe((documents) => {
        this.users = this.users.map((e) => {
          if (e.data.boxNumber == p.data.boxNumber) {
            return {
              ...e,
              children: documents.packageResult.map((d) => ({
                data: d,
                leaf: false,
              })),
              expanded: true,
            };
          } else {
            return e;
          }
        });
      });
    }
  }
}

// this.users.forEach((pack) => {
//   if (pack.children !== null) {
//     pack?.children.forEach((u) => {
//       if (u?.data?.docID == p?.data?.docID) {
//         u.children = documents.map((d) => {
//           return {
//             data: d,
//             leaf: false,
//           };
//         });
//       }
//     });
//   }
// });
