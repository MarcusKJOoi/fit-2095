import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";

@Component({
  selector: 'app-listmovies',
  templateUrl: './listmovies.component.html',
  styleUrls: ['./listmovies.component.css']
})
export class ListmoviesComponent implements OnInit {
  private moviesDB: any[] = [];
  constructor(private dbService: DatabaseService) {}
  ngOnInit() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }
}
