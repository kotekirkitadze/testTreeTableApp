import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

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
  @Output() onExpandEvent: EventEmitter<any> = new EventEmitter<any>();

  myNode: TreeNode[];
  leaf: boolean = true;
  @Input()
  set node(v: TreeNode[]) {
    this.myNode = v;
    this.headers = Object.keys(v[0]?.data);
  }
  get node() {
    return this.myNode;
  }
  constructor() {}

  headers: string[];
  ngOnInit(): void {
    console.log('gaixsna');
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
}
