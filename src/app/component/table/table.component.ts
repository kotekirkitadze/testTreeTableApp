import { Component, Input, OnInit, Output } from '@angular/core';
import * as EventEmitter from 'events';

export interface TreeNode {
  data?: any;
  children?: TreeNode[];
  leaf?: boolean;
  expanded?: boolean;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Output() onExpandEvent: EventEmitter = new EventEmitter();

  myNode: TreeNode[];
  leaf: boolean = true;
  @Input()
  set node(v: TreeNode[]) {
    this.myNode = v;
    console.log(v);
    this.headers = Object.keys(v[0]?.data);
    console.log('hihi');
  }
  get node() {
    return this.myNode;
  }
  constructor() {}

  headers: string[];
  ngOnInit(): void {}

  clickExpand(d) {
    let i = this.myNode.find((e) => e.data == d.data);
    // i = { ...i, };
    this.myNode = this.myNode.map((e) => {
      if (JSON.stringify(d.data) === JSON.stringify(e.data)) {
        return {
          ...e,
          expanded: !e.expanded,
        };
      } else {
        return e;
      }
    });

    this.node = [...this.node];
    this.onExpandEvent.emit(d);
  }

  handleThis(e) {
    return e.expanded;
  }
}
