import { Component, OnInit } from '@angular/core';

interface Book {
  bookTitle: string,
  pubDate: number,
  bookType: string,
  bookSum: string,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  books: Array<Book> = [];
  numOfHardCovers: number = 0;
  title = 'Week9';
  bookTitle: string = '';
  pubDate: number = Date.now();
  bookType: string = 'Hard Cover';
  bookSum: string = '';

  ngOnInit() {} 

  saveBook() {
    this.books.push({
      bookTitle: this.bookTitle,
      pubDate: this.pubDate,
      bookType: this.bookType,
      bookSum: this.bookSum,
    });
    if (this.bookType === 'Hard Cover') {
      this.numOfHardCovers += 1;
    };
  }

  deleteBook(bookNo: number): void {
    this.books.splice(bookNo, 1);
  }

  deleteHardCovers():void {
    this.books = this.books.filter(x => x.bookType !== 'Hard Cover')
    this.numOfHardCovers = 0;
  }
}
