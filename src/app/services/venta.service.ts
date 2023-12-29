import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  public url;

  constructor(

    private http: HttpClient

  ) { 

    this.url = environment.url;

  }

  get_ventas() : Observable<any> {
    let header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'venta/'+ 'listadoAdmin/', {headers: header});
  }
  
  get_ventasUser(id:any) : Observable<any> {
    let header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'venta/'+ 'listado/user/' + id, {headers: header});
  }

  save_venta(data : any) : Observable<any> {
    let header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'venta/'+ 'nuevaVenta', data, {headers: header});
  }

  get_detalles_venta(id : any) : Observable<any> {
    let header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'venta/'+ 'obtenerVenta/' + id, {headers: header});
  }

}
