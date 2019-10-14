import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";

@Component({
  selector: 'app-listactors1980',
  templateUrl: './listactors1980.component.html',
  styleUrls: ['./listactors1980.component.css']
})
export class Listactors1980Component implements OnInit {
  private actorsDB: any[] = [];
  constructor(private dbService: DatabaseService) {}
  ngOnInit() {
    this.dbService.getActorsAfterYear(1980).subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }
}
