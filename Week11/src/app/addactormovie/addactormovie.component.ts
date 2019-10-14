import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";

@Component({
  selector: 'app-addactormovie',
  templateUrl: './addactormovie.component.html',
  styleUrls: ['./addactormovie.component.css']
})
export class AddactormovieComponent implements OnInit {
  actorsDB: any[] = [];
  moviesDB: any[] = [];
  selectedActor: string = "";
  selectedMovie: string = "";
  constructor(private dbService: DatabaseService) {}
  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => { 
      this.moviesDB = data;
    });
  }
  //
  ngOnInit() {
    this.onGetActors();
    this.onGetMovies();
  }
  onAddActorMovie() {
    // Actor ID sent via POST request (body)
    const data = { id: this.selectedActor }
    // Movie ID sent via URL params (params)
    this.dbService.addActorToMovie(this.selectedMovie, data).subscribe(_ => {
      this.selectedActor = ""
      this.selectedMovie = "";
    });
  }
}
