import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router"
import { Noticia } from "./../noticia.model"
import { NoticiasService } from "./../app.service"
import { FacebookService } from "ngx-facebook"
import { TitleTagService } from "./metatag-sharer.service"

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css']
})
export class NoticiaComponent implements OnInit {

  noticia: Noticia
  urlNoticia: string
  source: string = 'https://filmow-app.s3-sa-east-1.amazonaws.com/posters/coringa.jpg'

  constructor(
    private _service: NoticiasService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private fbk: FacebookService,
    private titleTagService: TitleTagService
  ) {
    fbk.init({
      appId: '277049996807418',
      cookie: true,
      xfbml: true,
      version: 'v2.8'
    })
  }

  ngOnInit(): void {
    const titulo: string = this._activatedRoute.snapshot.params['title']
    const urlFixa = "https://asiloweb-app.herokuapp.com/#" + this._router.url
    this.getNoticiaByTitle(titulo)
    this.urlNoticia = urlFixa
  }

  getNoticiaByTitle(titulo: string) {
    this._service.getNoticiaByTitle(titulo, 'public').subscribe(response => {
      this.noticia = response.body['data']
      this.setMetaTags()
    }, err => {
      console.log(`error - ${err}`)
    })
  }

  setMetaTags() {
    this.titleTagService.setTile('Lar São Vicente de Paulo')
    this.titleTagService.setSocialMediaTags(
      this.urlNoticia,
      this.noticia['titulo'],
      'Acesse nosso site e veja essa nova notícia que publicamos!',
      this.source
    )
  }

  share() {
    this.fbk.ui({
      method: 'share_open_graph',
      action_type: 'og.shares',
      action_properties: JSON.stringify({
        object: {
          'og:title': this.noticia['titulo'],
          'og:description': 'Acesse nosso site e veja essa nova notícia que publicamos!',
          'og:image': this.source,
          'og:url': this.urlNoticia,
        }
      })
    })
  }

}
