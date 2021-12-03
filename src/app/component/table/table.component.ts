import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  user: any;
  @Input()
  set users(v) {
    this.user = v;
    this.headers = Object.keys(v[0]);
    console.log(this.headers);
  }
  get users() {
    return this.user;
  }
  constructor() {}

  headers: string[];
  ngOnInit(): void {}
}
