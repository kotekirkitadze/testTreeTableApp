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
  show: boolean = false;
  packages: TreeNode[] = [];
  headers = [];
  ngOnInit() {
    // this.getDataService.getPackages().subscribe((pac) => {
    //   this.packages = pac;
    //   console.log(pac);
    //   this.headers = Object.keys(this?.packages[0]);
    // });
    this.getDataService.getUser().subscribe((d) => {
      this.users = [];
      this.users = [...d].map((e) => {
        if (e.name == 'kote') {
          return {
            data: e,
            leaf: true,
            children: [
              {
                data: { docName: 'sabuti 1', created: 2021 },
                leaf: false,
              },
            ],
          };
        } else {
          return {
            data: e,
            leaf: true,
            children: [
              {
                data: { docName: 'sabuti 22', created: 2020 },
                leaf: false,
              },
            ],
          };
        }
      });
      this.loaded = true;
      console.log(this.loaded);
    });
  }

  handleExpand(e) {
    console.log(e);
  }
  users: any;
  handle(id) {
    this.getDataService.getUser().subscribe((d) => {
      this.users = [];
      this.users = [...d].map((e) => {
        if (e.name == 'kote') {
          return {
            data: e,
            leaf: true,
            children: [
              {
                data: { docName: 'sabuti 1', created: 2021 },
                leaf: false,
              },
            ],
          };
        } else {
          return {
            data: e,
            leaf: true,
            // children: [
            //   {
            //     data: { docName: 'sabuti 22', created: 2020 },
            //     leaf: false,
            //   },
            // ],
          };
        }
      });
      this.loaded = true;
      console.log(this.loaded);
    });
  }

  hh(id, u: any[]) {
    return u?.every((e) => e?.data?.id == id);
  }
}
