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

  show: boolean = false;
  packages = [];
  headers = [];
  ngOnInit() {
    this.getDataService.getPackages().subscribe((pac) => {
      this.packages = pac;
      this.headers = Object.keys(this?.packages[0]);
    });
  }

  users: any;
  handle(p) {
    this.getDataService.getUser(p.id).subscribe((d) => {
      this.users = [];
      this.users = [...d].map((e) => {
        console.log('kkkk', e.name == 'kote');
        if (e.name == 'kote') {
          return {
            data: e,
            leaf: true,
            children: [
              {
                data: { name: 'kote', age: 22 },
                leaf: false,
              },
            ],
          };
        } else {
          return {
            data: e,
            leaf: true,
          };
        }
      });
      console.log(this.users);
    });
  }

  hh(id, u: any[]) {
    // u?.forEach((e) => console.log(e.data));
    return u?.every((e) => e?.data?.id == id);
  }
}
