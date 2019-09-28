import { Component } from '@angular/core';

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
  deleteCount: number = 0;
  section: string = '';
  sectionNum: number;
  
  saveBook(): void {
    this.books.push({
      bookTitle: this.bookTitle,
      pubDate: this.pubDate,
      bookType: this.bookType,
      bookSum: this.bookSum,
    });
    if (this.bookType === 'Hard Cover') {
      this.numOfHardCovers += 1;
    };
    this.bookTitle = '';
    this.pubDate = Date.now();
    this.bookType = 'Hard Cover';
    this.bookSum = '';
  }

  deleteBook(bookNo: number): void {
    const deletedBook = this.books.splice(bookNo, 1)[0];
    if (deletedBook.bookType === 'Hard Cover') {
      this.numOfHardCovers -= 1;
    }
  }

  deleteNBooks(): void {
    const deletedBooks = this.books.splice(0, this.deleteCount);
    deletedBooks.forEach(book => {
      if (book.bookType === 'Hard Cover') {
        this.numOfHardCovers -= 1;
      }
    });
    this.deleteCount = 0;
  }

  deleteHardCovers():void {
    this.books = this.books.filter(book => book.bookType !== 'Hard Cover');
    this.numOfHardCovers = 0;
  }
}
