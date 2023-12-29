import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public url;

  constructor(

    private _http: HttpClient,

  ) {

    this.url = environment.url;

  }

  //LISTAR PRODUCTOS
  get_productos(filtro: any):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'producto/' + '/listado/' + filtro, {headers:headers})
  }

  get_categorias():Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'categoria/' + 'listado', {headers:headers})
  }

  delete_categoria(id:any):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.url + 'categoria/' + 'eliminar/' + id, {headers:headers})
  }

  post_producto(data:any){
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url + 'producto/' + '/registrar', data, {headers:headers})
  }

  get_producto(id:any):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'producto/' + 'ver/' + id, {headers:headers})
  }

  put_producto(data:any){
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url + 'producto/editar/' + data.id, data, {headers:headers})
  }

  post_categoria(data:any):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url + 'categoria/registrar', data, {headers:headers})
  }

  eliminar_producto(id:any):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.url + 'producto/eliminar/' + id, {headers:headers})
  }

  act_stock(data:any):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url+'producto/actualizar/stock/'+data.id,data,{headers:headers});
  }

}
