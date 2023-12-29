import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import { Injectable } from '@angular/core';
import {Tarea} from "../models/Tarea";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  public url;
  public tarea;

  constructor(

    private _http : HttpClient,

  ) {

    this.url = environment.url;
    this.tarea = new Tarea('', '', '', '', '', '');

  }

  get_tareas(id:any, filtro:any) : Observable<any>{

    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'tarea/' + 'listar/' + id + '/' + filtro, {headers : headers})

  }

  get_tareasAdmin(filtro:any) : Observable<any>{

    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'tarea/' + 'listarAdmin/' + filtro, {headers : headers})

  }

  get_tarea(id:any):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'tarea/' + 'ver/' + id, {headers:headers})
  }

  get_tareaUser(id:any):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'tarea/' + 'ver/user/' + id, {headers:headers})
  }

  get_clientes():Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'cliente/' + '/listar/', {headers:headers})
  }

  get_usersByRol(role:any) : Observable<any>{

    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'user/' + 'rol/' + role, {headers : headers})

  }

  post_tarea(data:any) : Observable<any> {
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url + 'tarea/' + 'registrar' ,data , {headers : headers})
  }

  put_tareas(data:any):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url + 'tarea/' + 'editar/' + data.id, data, {headers:headers})
  }

  eliminar_tarea(id:any):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.url + 'tarea/' + 'eliminar/' + id, {headers:headers})
  }


}
