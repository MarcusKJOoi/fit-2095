import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css']
})
export class AddmovieComponent {
  title: string = ""; // movie title
  year: number = 0; // movie year
  constructor(private dbService: DatabaseService, private router: Router) {}
  onSaveMovie() {
    const obj = { title: this.title, year: this.year };
    this.dbService.createMovie(obj).subscribe(_ => {
      this.router.navigate(["/listmovies"]);
    });
    this.title = '';
    this.year = 0;
  } 
}
