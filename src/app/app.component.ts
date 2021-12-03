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
      this.users = d;
    });
  }

  hh(id, u: any[]) {
    return u?.every((e) => e.id == id);
  }
}
