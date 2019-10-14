import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-deleteactor",
  templateUrl: "./deleteactor.component.html",
  styleUrls: ["./deleteactor.component.css"],
})

export class DeleteactorComponent implements OnInit {
  private actorsDB: any[] = [];
  constructor(private dbService: DatabaseService, private router: Router) {}
  //Get all Actors
  onGetActors() {
    return this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }
  //Delete Actor
  onDeleteActor(item) {
    this.dbService.deleteActor(item._id).subscribe(_ => {
      this.onGetActors();
      this.router.navigate(["/listactors"]);
    });
  }
  // This callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetActors();
  }
}