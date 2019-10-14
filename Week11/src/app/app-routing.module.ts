import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddactorComponent } from 'src/app/addactor/addactor.component';
import { ViewnotfoundComponent } from 'src/app/viewnotfound/viewnotfound.component';
import { ListactorsComponent } from './listactors/listactors.component';
import { UpdateactorComponent } from './updateactor/updateactor.component';
import { DeleteactorComponent } from './deleteactor/deleteactor.component';
import { ListmoviesComponent } from './listmovies/listmovies.component';
import { AddmovieComponent } from './addmovie/addmovie.component';
import { DeletemovieComponent } from './deletemovie/deletemovie.component';
import { AddactormovieComponent } from './addactormovie/addactormovie.component';

const routes: Routes = [
  { path: "listactors", component: ListactorsComponent },
  { path: "addactor", component: AddactorComponent },
  { path: "updateactor", component: UpdateactorComponent },
  { path: "deleteactor", component: DeleteactorComponent },
  { path: "listmovies", component: ListmoviesComponent },
  { path: "addmovie", component: AddmovieComponent },
  { path: "deletemovie", component: DeletemovieComponent },
  { path: "addactormovie", component: AddactormovieComponent },
  { path: "", redirectTo: "/listactors", pathMatch: "full" },
  { path: "**", component: ViewnotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
