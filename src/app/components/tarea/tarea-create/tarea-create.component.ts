import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tarea } from 'src/app/models/Tarea';
import { TareaService } from 'src/app/services/tarea.service';
import { UserService } from 'src/app/services/user.service';
import { ScriptUploadService } from 'src/app/services/script-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tarea-create',
  templateUrl: './tarea-create.component.html',
  styleUrls: ['./tarea-create.component.css']
})
export class TareaCreateComponent implements OnInit {

  public tarea;
  public usuarios : any;
  public clientes : any;
  public identity : any;

  constructor(

    private _tareaService : TareaService,
    private _userService : UserService,
    private router : Router,
    private _uploadScriptService : ScriptUploadService

  ) {

    this.tarea = new Tarea('', '', '', '', '', '');
    this.identity = this._userService.getIdentity();
    this._uploadScriptService.Upload(["validacionTarea"]);
   }

  ngOnInit(): void {
    

    if(this.identity.role == 'ADMIN' || this.identity.role == 'TECNICO'){

      this._tareaService.get_usersByRol('TECNICO').subscribe(
        response => {
          this.usuarios = response.user;
          console.log(response);
          
          
        },
        error => {
  
        }
      ) 
  
      this._tareaService.get_clientes().subscribe(
        response => {
          this.clientes = response.clientes;
          
        },
        error => {
  
        }
      )

    }else{

      this.router.navigate([('')]);

    }

  }

  onSubmit(tareaForm:any){
    if(tareaForm.valid){

      this._tareaService.post_tarea({
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
            title: 'Usuario registrado correctamente!',
            footer: '<p>Tecno Service Messages</p>',
            showConfirmButton: false,
            timer: 1500
          })
          this.tarea = new Tarea('','','','','','') //PARA QUE SE PONGAN EN BLANCO LOS CAMPOS
          this.router.navigate(['tareas'])
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
