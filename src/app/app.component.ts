import { Component } from "@angular/core"
import { Router } from "@angular/router"
import { Noticia } from "./noticia.model"
import { NoticiasService } from "./app.service"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  noticias: Noticia[]

  constructor(
    private _service: NoticiasService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._router.routeReuseStrategy.shouldReuseRoute = () => false
    this._service.params = this._service.params.set('valueSort', 'descending')
    this._service.params = this._service.params.set('columnSort', 'date')
    this._service.params = this._service.params.set('page', '1')
    this._service.params = this._service.params.set('limit', '50')
    this.getNoticiasWithParams()
  }

  getNoticiasWithParams() {
    this._service.getNoticiasWithParams('public').subscribe(response => {
      this.noticias = response.body['data']
    }, err => {
      console.log(`error - ${err}`)
    })
  }

}
