import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from 'src/app/services/user.service'

interface SideNavToggle {
  screenWidth: number,
  collapsed: boolean
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

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
