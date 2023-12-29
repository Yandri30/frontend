import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  public url;

  constructor(
    private _http : HttpClient,
  ) {

    this.url = environment.url;

  }

  get_clientes():Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'cliente/' + '/listar/', {headers:headers})
  }

  post_clientes(data:any):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url + 'cliente/' + '/registrar', data, {headers:headers})
  }

  get_cliente(id: any):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'cliente/' + '/ver/' + id, {headers:headers})
  }

  act_cliente(data:any):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url + 'cliente/' + 'editar/' + data.id, data, {headers:headers})
  }

  eliminar_cliente(id:any):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.url + 'cliente/' + '/eliminar/' + id, {headers:headers})
  }
}
