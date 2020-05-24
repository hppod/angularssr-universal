import { Injectable } from "@angular/core"
import { HttpClient, HttpResponse, HttpParams } from "@angular/common/http"
import { Observable } from "rxjs"
import { AsiloWebApi } from "./app.api"
import { Noticia } from "./noticia.model"

@Injectable({
    providedIn: 'root'
})
export class NoticiasService {

    constructor(private http: HttpClient) { }

    params = new HttpParams()

    getNoticiasWithParams(modifier: string): Observable<HttpResponse<Noticia[]>> {
        return this.http.get<Noticia[]>(`${AsiloWebApi}/${modifier}/noticia/listar-todos`, { params: this.params, observe: 'response' })
    }

    getNoticiaByTitle(title: string, modifier: string): Observable<HttpResponse<Noticia>> {
        return this.http.get<Noticia>(`${AsiloWebApi}/${modifier}/noticia/listar-um/${title}`, { observe: 'response' })
    }
}