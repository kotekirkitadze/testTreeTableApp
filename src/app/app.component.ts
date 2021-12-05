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
          children: !!p['user'] ? null : undefined,
        };
      });
    });
  }

  handleExpand(p) {
    if (!p.expanded && !p.children) {
      if (p.data.type == 'package') {
        this.getDataService.getUser(p.data.id).subscribe((users) => {
          this.users = this.users.map((e) => {
            if (e.data.id == p.data.id) {
              return {
                ...e,
                children: users.map((u) => ({
                  data: u,
                  leaf: !!u['documents'] ? true : false,
                })),
                expanded: true,
              };
            } else {
              return e;
            }
          });
        });
      } else if (p.data.type == 'user') {
        this.getDataService.getDocs(p.data.id).subscribe((documents: any[]) => {
          this.users = this.users.map((pac) => {
            if (pac.children != null) {
              return {
                ...pac,
                children: pac.children.map((u) => {
                  if (u.data.docID == p.data.docID) {
                    return {
                      ...u,
                      children: documents.map((d) => {
                        return {
                          data: d,
                          leaf: false,
                          expanded: true,
                        };
                      }),
                    };
                  } else {
                    return u;
                  }
                }),
              };
            } else {
              return pac;
            }
          });
        });
      }
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
