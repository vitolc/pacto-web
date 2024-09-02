import {Component, EventEmitter, Input, numberAttribute, Output} from '@angular/core';
import {NgbPagination, NgbPaginationNext, NgbPaginationPrevious} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-pagination',
  templateUrl: './app-pagination.component.html',
  standalone: true,
  imports: [
    NgbPagination,
    NgbPaginationPrevious,
    NgbPaginationNext,
    FormsModule
  ],
  styleUrls: ['./app-pagination.component.scss']
})
export class AppPaginationComponent {

    @Input()
    show: boolean = false;

    @Input()
    totalResults: number = 0;

    @Input({transform: numberAttribute})
    currentPage: number = 0;

    @Input()
    itemsPerPage: number = 10;

    @Input()
    itemsPerPageList: number[] = [10, 15, 20, 25, 50];

    @Output()
    paginateEvent = new EventEmitter();

    @Output()
    itemsPerPageChangeEvent = new EventEmitter();

    handleAmountPaginationItems() {
        return this._handleAmountPaginationItems(screen.width);
    }

    paginate(ev: any) {
        this.paginateEvent.emit(ev);
    }

    changeItemsPerPage(ev: any) {
        this.itemsPerPageChangeEvent.emit(ev);
    }

  private _handleAmountPaginationItems(screenWidth: number): number {
    if (screenWidth < 1250 && screenWidth >= 520) {
      return 7;
    }
    if (screenWidth < 520 && screenWidth >= 400) {
      return 3;
    }
    if (screenWidth < 400) {
      return 2;
    }
    return 10;
  }
}
