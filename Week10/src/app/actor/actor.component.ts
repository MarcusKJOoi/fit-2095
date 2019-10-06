import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";
@Component({
  selector: "app-actor",
  templateUrl: "./actor.component.html",
  styleUrls: ["./actor.component.css"],
})
export class ActorComponent implements OnInit {
  actorsDB: any[] = [];
  moviesDB: any[] = [];
  section: number = 1;
  fullName: string = "";
  bYear: number = 0;
  actorId: string = "";
  title: string = ""; // movie title
  year: number = 0; // movie year
  selectedActor: string = "";
  selectedMovie: string = "";
  constructor(private dbService: DatabaseService) {}
  //Get all Actors
  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }
  //Create a new Actor, POST request
  onSaveActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.createActor(obj).subscribe(_ => {
      this.onGetActors();
    });
    this.fullName = '';
    this.bYear = 0;
  }
  // Update an Actor
  onSelectUpdate(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }
  onUpdateActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.updateActor(this.actorId, obj).subscribe(_ => {
      this.onGetActors();
    });
    this.fullName = '';
    this.bYear = 0;
  }
  //Delete Actor
  onDeleteActor(item: any) {
    this.dbService.deleteActor(item._id).subscribe(_ => {
      this.onGetActors();
    });
  }
  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetActors();
    this.onGetMovies();
  }
  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
  }
  resetValues() {
    this.fullName = "";
    this.bYear = 0;
    this.actorId = "";
  }
  // Get all movies
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => { 
      this.moviesDB = data;
    });
  }
  // Add a new movie
  onSaveMovie() {
    const obj = { title: this.title, year: this.year };
    this.dbService.createMovie(obj).subscribe(_ => {
      this.onGetMovies();
    });
    this.title = '';
    this.year = 0;
  } 
  // Delete a movie
  onDeleteMovie(item: any) {
    this.dbService.deleteMovie(item._id).subscribe(_ => {
      this.onGetMovies();
    });
  }
  // Delete movie(s) before a year
  onDeletePreceedingMovies() {
    this.dbService.deletePreceedingMovies(this.year).subscribe(_ => {
      this.onGetMovies();
    });
    this.year = 0;
  }
  // Add actor to a movie
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