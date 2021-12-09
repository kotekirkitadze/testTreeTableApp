import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TreeNode } from 'src/app/app.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Output() onExpandEvent: EventEmitter<any> = new EventEmitter<any>();

  myNode: TreeNode[] = [];
  originalNode: TreeNode[] = [];

  @Input()
  set node(v: TreeNode[]) {
    if (v[0]?.data != null) {
      this.myNode = v;
      this.headers = Object.keys(v[0]?.data);
    } else {
      this.myNode = [];
    }
  }
  get node() {
    return this.myNode;
  }
  constructor() {}

  headers: string[];
  ngOnInit(): void {
    this.originalNode = this.myNode.slice(0);
  }

  clickExpand(d) {
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

  handleThis(item) {
    return item.expanded && item.children?.length > 0;
  }

  handleFiltering(e) {
    if (e.length > 0) {
      this.node = [...e];
    } else {
      this.node = [];
    }
  }
}
