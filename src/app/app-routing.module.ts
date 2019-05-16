import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThankComponent } from './thank/thank.component';
import { GoogleComponent } from './google/google.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path:"thank" , component:ThankComponent},
  {path:"google", component:GoogleComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
