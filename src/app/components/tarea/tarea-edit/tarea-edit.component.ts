import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TareaService } from 'src/app/services/tarea.service';
import { ScriptUploadService } from 'src/app/services/script-upload.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tarea-edit',
  templateUrl: './tarea-edit.component.html',
  styleUrls: ['./tarea-edit.component.css']
})
export class TareaEditComponent implements OnInit {

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
    private _uploadScriptService : ScriptUploadService
  ) { 

    this.url = environment.url;
    this.identity = this._userService.getIdentity();
    this._uploadScriptService.Upload(["validacionTarea"]);
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

  onSubmit(tareaForm:any){
    if(tareaForm.valid){
      this._tareaService.put_tareas({
        _id: this.id,
        titulo: tareaForm.value.titulo,
        descripcion: tareaForm.value.descripcion,
        problema: tareaForm.value.problema,
        iduser: tareaForm.value.iduser,
        idcliente: tareaForm.value.idcliente,
      }).subscribe(
        response => {
          
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Tarea actualizada correctamente!',
            footer: '<p>Tecno Service Messages</p>',
            showConfirmButton: false,
            timer: 1500
          })
          
          this.route.navigate(['tareas'])
          
        },
        error => {

        }
      )
      
      
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Algo salió mal!',
        text: 'Rellena todos los campos del formulario!',
        footer: '<p>Tecno Service Messages</p>'
      })
      
    }
  }
  



}
