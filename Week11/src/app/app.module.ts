import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { DatabaseService } from "./database.service";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { ListactorsComponent } from "./listactors/listactors.component";
import { AddactorComponent } from "./addactor/addactor.component";
import { DeleteactorComponent } from "./deleteactor/deleteactor.component";
import { UpdateactorComponent } from "./updateactor/updateactor.component";
import { AddmovieComponent } from './addmovie/addmovie.component';
import { DeletemovieComponent } from './deletemovie/deletemovie.component';
import { ListmoviesComponent } from './listmovies/listmovies.component';
import { AddactormovieComponent } from './addactormovie/addactormovie.component';
import { ViewnotfoundComponent } from './viewnotfound/viewnotfound.component';
import { AppRoutingModule } from './app-routing.module';
@NgModule({
  declarations: [
    AppComponent,
    ListactorsComponent,
    AddactorComponent,
    UpdateactorComponent,
    DeleteactorComponent,
    AddmovieComponent,
    DeletemovieComponent,
    ListmoviesComponent,
    AddactormovieComponent,
    ViewnotfoundComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent],
})
export class AppModule {}