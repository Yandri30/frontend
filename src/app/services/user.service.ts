import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

//IMPORTAMOS EL MODELO USER
import {User} from "../models/User"
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url;
  public user;
  public token: any;
  public identity: any;

  constructor(

    private _http : HttpClient,

  ) {

    this.url = environment.url; //AQUI SE GUARDA EL URL DE MI BACKEND
    this.user = new User('','','','','','','',''); //INICIALIZAMOS EL MODELO CON CADENAS VACIAS, 5 CADENAS VACIAS YA QUE SON 5 ATRIBUTOS

  }

  login(user: any, getToken = false):Observable<any>{

    const json = user;

    //COMPROBAMOS SI HAY UN TOKEN O NO
    if(getToken != false){
      user.gettoken = true; //SI ES NULO PASARÁ A TRUE
    }

    const headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.post(this.url + 'user/' + 'login', json, {headers: headers});

  }

  //PARA OBTENER EL TOKEN DEL USUARIO
  getToken():Observable<any>{

    //OBTENEMOS LA LLAVE TOKEN EN EL LOCAL STORAGE
    const token = localStorage.getItem('token');
    if(token){
      this.token = token;
    }else{
      this.token = null;
    }

    return this.token;

  }

  //PARA OBTENER LOS DATOS DE UN USUARIO AUTENTICADO
  getIdentity():Observable<any>{

    //OBTENEMOS LA LLAVE IDENTITY EN EL LOCAL STORAGE
    const identity = JSON.parse(localStorage.getItem('identity') || "[]"); //POR SI ACASO ESTE NULO, NO SE VERA AFECTADA LA APP
    if(identity){
      this.identity = identity;
    }else{
      this.identity = null;
    }

    return this.identity;

  }

  get_users(filtro:any) : Observable<any>{

    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'user/' + 'listado/' + filtro, {headers : headers})

  }

  post_user(data:any) : Observable<any> {
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url + 'user/' + 'registrar' ,data , {headers : headers})
  }

  get_user(id:any) : Observable<any>{

    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'user/' + 'ver/' + id, {headers : headers})

  }

  put_user(data:any) : Observable<any> {
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url + 'user/' + 'editar/' + data.id ,data , {headers : headers})
  }

  eliminar_user(id:any):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.url + 'user/' + 'eliminar/' + id, {headers:headers})
  }

}
