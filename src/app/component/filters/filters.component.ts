import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FilterTypes, TreeNode } from 'src/app/app.component';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  @Input() filterInput: FilterTypes;
  @Input() data: TreeNode[];

  @Output() filterHappened: EventEmitter<any> = new EventEmitter<any>();

  filteredData: TreeNode[];

  constructor() {}

  ngOnInit(): void {}

  handleCases(event) {
    let searchValue: string = event.target.value.toLowerCase();

    this.filteredData = this.data.filter((e) => {
      let i: string = e.data[this.filterInput.header].toLowerCase();
      return i.includes(searchValue);
    });
    this.filterHappened.emit(this.filteredData);
  }
}
