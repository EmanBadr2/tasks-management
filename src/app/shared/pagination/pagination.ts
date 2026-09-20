import { Component, computed, input, output, } from '@angular/core';


@Component({
  imports: [],
  selector: 'app-pagination',
  styleUrl: './pagination.scss',
  templateUrl: './pagination.html',
})
export class Pagination {
 currentPage = input.required<number>()     //page num
  pageSize  = input.required<number>()     //num of items in page
  totalItems  = input.required<number>()   //array.length

  pageChange =output<number>()      // update current page then send it to parent

 
  totalPages = computed<number>( ()=>{
   return Math.ceil( this.totalItems() / this.pageSize()  )
  })

 pages = computed<number[]>(() => {
  const total = this.totalPages();
  return total <= 3
    ? Array.from({ length: total }, (_, i) => i + 1)
    : [1, 2, 3, total];
});


previousPage(){
  if( this.currentPage() > 1){ 
    this.pageChange.emit( this.currentPage() -1)
  }
}
nextPage(){
   if( this.currentPage() < this.totalPages()){
    this.pageChange.emit( this.currentPage() +1)
   }
}

goToPage(page: number): void {
  this.pageChange.emit( page)
}

}
