import { Component, computed, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-pagination',
  styleUrl: './pagination.scss',
  templateUrl: './pagination.html',
})
export class Pagination {

  currentPage = input.required<number>(); //page num
  totalPages  = input.required<number>();
  pageChange = output<number>(); // update current page then send it to parent

  pageSize = input.required<number>(); //num of items in page
  totalItems = input.required<number>(); //array.length
  // totalPages = computed<number>(() => {
  //   return Math.ceil(this.totalItems() / this.pageSize());
  // });

  pages = computed<number[]>(() => {
    const total = this.totalPages();
    return total <= 3 ? Array.from({ length: total }, (_, i) => i + 1) : [1, 2, 3, total];
  });



  previousPage() {
    if (this.currentPage() > 1) {
      this.pageChange.emit(this.currentPage() - 1);
    }
  }
  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.pageChange.emit(this.currentPage() + 1);
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages() && page !== this.currentPage()) {
      this.pageChange.emit(page);
    }
  }

  // readonly pages = computed<PageItem []>(() => {
  //    const total = this.totalPages();
  //    const current = this.currentPage();
  //      if (total <= 5) {
  //   return Array.from({ length: total }, (_, i) => i + 1);
  // }

  // if (current <= 3) {
  //   return [1, 2, 3, 4, '…', total];
  // }

  // if (current >= total - 2) {
  //   return [1, '…', total - 3, total - 2, total - 1, total];
    
  // }

  // return [1, '…', current - 1, current, current + 1, '…', total];

  //  } )


}

export type PageItem = number | '…';

// export function buildPageList(  current: number,  total: number): PageItem[] {
//   if (total <= 5) {
//     return Array.from({ length: total }, (_, i) => i + 1);
//   }

//   if (current <= 3) {
//     return [1, 2, 3, 4, '…', total];
//   }

//   if (current >= total - 2) {
//     return [1, '…', total - 3, total - 2, total - 1, total];
//   }

//   return [1, '…', current - 1, current, current + 1, '…', total];
// }