import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public identity : any;
  public token : any;

  constructor(

    private _userService : UserService,
    private _router : Router,

  ) {

    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

   }

  ngOnInit(): void {
  }

  logout(){
    //PARA CERRAR SESION SIMPLEMENTE SE DESTRUYE O REMUEVE LA LLAVES IDENTITY Y TOKEN
    localStorage.removeItem('identity');
    localStorage.removeItem('token');


    //PONEMOS VACIAS LAS LLAVES
    this.identity = null;
    this.token = null;

    //REDIRECCIONAMOS AL LOGIN
    this._router.navigate([''])

  }

}
