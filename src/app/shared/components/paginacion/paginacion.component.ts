import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  styleUrls: ['./paginacion.component.css']
})
export class PaginacionComponent implements OnInit {

  _total: number | null = 0;
  _page: number | null = 0;
  _pageSize: number | null = 5;
  _lastPage: number | null = 0;
  _pageList: number[] = [];
  @Input() set Total(value: number | null) {
    this._total = value;
    this.SetPageDisplay();
  }
  @Input() set PageSize(value: number | null) {
    this._pageSize = value;
    this.SetPageDisplay();
  }
  @Input() set Page(value: number | null) {
    this._page = value;
    this.SetPageDisplay();
  }
  @Output() PageChanged: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  private SetPageDisplay(): void {
    if (!this._page || !this._total || !this._pageSize) {
      return;
    }
    this._pageList = [];
    const pageNumber = Math.ceil(this._total / this._pageSize);
    this._lastPage = pageNumber;
    if (pageNumber <= 3) {
      for (let i = 1; i <= pageNumber; i++) {
        this._pageList.push(i);
      }
    } else {
      if (this._page === pageNumber) {
        this._pageList.push(pageNumber - 2);
        this._pageList.push(pageNumber - 1);
        this._pageList.push(pageNumber);
      } else if (this._page === 1) {
        this._pageList.push(1);
        this._pageList.push(2);
        this._pageList.push(3);
      } else {
        this._pageList.push(this._page - 1);
        this._pageList.push(this._page);
        this._pageList.push(this._page + 1);
      }
    }
  }

  public PageSelection(pageNumber: number): void {
    this.PageChanged.emit(pageNumber);
    this.SetPageDisplay();
  }

}
