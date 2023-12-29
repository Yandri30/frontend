import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TareaService } from 'src/app/services/tarea.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tarea-view',
  templateUrl: './tarea-view.component.html',
  styleUrls: ['./tarea-view.component.css']
})
export class TareaViewComponent implements OnInit {

  public tarea:any;
  public id : any;
  public url;
  usuarios: any;
  clientes: any;
  public identity : any;

  constructor(
    private _route : ActivatedRoute,
    private _tareaService : TareaService,
    private _userService : UserService,
    private route : Router,

  ) { 

    this.url = environment.url;
    this.identity = this._userService.getIdentity();


  }

  ngOnInit(): void {

    if(this.identity.role == 'ADMIN' || this.identity.role == 'TECNICO'){

      this._route.params.subscribe(params => {

        this.id = params['id'];
        this._tareaService.get_tarea(this.id).subscribe(
          response => {
            this.tarea = response.tarea;          
            this._tareaService.get_usersByRol('TECNICO').subscribe(
              response => {
                this.usuarios = response.user;             
                
              },
              error => {
        
              }
            )
          }
        )
  
      })
  
      this._tareaService.get_clientes().subscribe(
        response => {
          this.clientes = response.clientes;
          
        },
        error => {
  
        }
      )
    }else{
      this.route.navigate([('')]);
    } 

    

  }

}
