import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  @Output() valueResponse: EventEmitter<any> = new EventEmitter();
  @Output() valuePagination: EventEmitter<any> = new EventEmitter();
  arrayCheckbox: any[] = [];
  @Input() displayedColumns!: any[];
  @Input() pageIndex!: number;
  @Input() pageSize!: number;
  @Input() length!: number;
  @Input() loading!: boolean;
  @Input() dataSource!: any;
  @Input() actions!: any[];

  modoRedux: Observable<boolean> = new Observable();
  displayedColumnsTemporal!: any[];

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor() {}

  ngOnInit() {
    this.displayedColumnsTemporal = this.displayedColumns.map(col => col.head);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clickAction(value: any, id: number) {
    this.valueResponse.emit({ actions: value, id });
  }

  clickPagination(value: any) {
    const { pageIndex, pageSize } = value;
    this.valuePagination.emit({ pageIndex, pageSize });
  }
}
