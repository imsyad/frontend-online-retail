import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output, ViewChild
} from '@angular/core';
import {TableColumn} from "../../models/table-column.interface";
import {debounceTime, distinctUntilChanged, fromEvent, map} from "rxjs";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit, AfterViewInit {
  @Input() tableTitle!: string;
  @Input() dataSource: any;
  @Input() columns!: TableColumn[];
  @Input() displayedColumns!: string[];
  @Input() onAdd!: boolean;
  @Input() onEdit!: boolean;
  @Input() onDelete!: boolean;
  @Input() onExport: boolean = false;
  @Input() isLoading?: boolean = false;

  @Output() onAddClicked = new EventEmitter<any>();
  @Output() onEditClicked = new EventEmitter<any>();
  @Output() onDeleteClicked = new EventEmitter<any>();
  @Output() onSearch = new EventEmitter<string>();
  @Output() onExportClicked = new EventEmitter<any>();

  @ViewChild('inputFilter', {static: true}) inputFilter!: ElementRef;

  ngOnInit() {
    if (this.onEdit || this.onDelete) {
      this.displayedColumns = [...this.displayedColumns, 'action'];
    }
  }

  ngAfterViewInit() {
    fromEvent(this.inputFilter.nativeElement, 'input')
      .pipe(
        map((event: any) => (event.target as HTMLInputElement).value),
        debounceTime(200),
        distinctUntilChanged()
      ).subscribe((value: string) => {
      this.onSearch.emit(value);
    })
  }
}
