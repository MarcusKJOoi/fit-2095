import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-deletemovie',
  templateUrl: './deletemovie.component.html',
  styleUrls: ['./deletemovie.component.css']
})
export class DeletemovieComponent implements OnInit {
  private moviesDB: any[] = [];
  constructor(private dbService: DatabaseService, private router: Router) {}
  //Get all Actors
  onGetMovies() {
    return this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }
  onDeleteMovie(item) {
    this.dbService.deleteMovie(item._id).subscribe(_ => {
      this.onGetMovies();
      this.router.navigate(["/listmovies"]);
    });
  }
  // This callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetMovies();
  }
}
