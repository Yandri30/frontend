import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { ScriptUploadService } from 'src/app/services/script-upload.service';
import Swal from 'sweetalert2';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  public user;
  public identity : any;

  constructor(

    private _userService : UserService,
    private router : Router,
    private _uploadScriptService : ScriptUploadService

  ) {
    
    this.user = new User('','','','','','','','');
    this.identity = this._userService.getIdentity();
    this._uploadScriptService.Upload(["validacionUser"]);

   }

  ngOnInit(): void {

    if(this.identity.role == 'ADMIN'){

    }else{
      this.router.navigate([('')]);
    }

  }

  onSubmit(userForm:any){
    if(userForm.valid){

      this._userService.post_user({
        password: userForm.value.password,
        nombres: userForm.value.nombres,
        apellidos: userForm.value.apellidos,
        cedula: userForm.value.cedula,
        email: userForm.value.email,
        telefono: userForm.value.telefono,
        role: userForm.value.role,
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
          this.user = new User('','','','','','','','') //PARA QUE SE PONGAN EN BLANCO LOS CAMPOS
          this.router.navigate(['users'])
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
