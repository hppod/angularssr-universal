import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { HttpClientModule } from "@angular/common/http"
import { RouterModule, Routes } from "@angular/router"
import { FacebookModule } from 'ngx-facebook';

import { AppComponent } from "./app.component";
import { NoticiaComponent } from './noticia/noticia.component'

const ROUTES: Routes = [
  { path: '', component: AppComponent },
  { path: 'noticia/:title', component: NoticiaComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    NoticiaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FacebookModule.forRoot(),
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
