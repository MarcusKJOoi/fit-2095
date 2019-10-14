import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";

@Component({
  selector: "app-listactors",
  templateUrl: "./listactors.component.html",
  styleUrls: ["./listactors.component.css"],
})

export class ListactorsComponent implements OnInit {
  private actorsDB: any[] = [];
  constructor(private dbService: DatabaseService) {}
  ngOnInit() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }
}