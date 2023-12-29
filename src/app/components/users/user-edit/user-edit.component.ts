import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ScriptUploadService } from 'src/app/services/script-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  public id : any;
  public user : any;
  public passwordText : any;
  public identity : any;

  constructor(

    private _route : ActivatedRoute,
    private _userService : UserService,
    private route : Router,
    private _uploadScriptService : ScriptUploadService

  ) {

    this.identity = this._userService.getIdentity();
    this._uploadScriptService.Upload(["validacionUser"]);

  }

  ngOnInit(): void {

    if(this.identity.role == 'ADMIN'){

      this._route.params.subscribe(params => {
        this.id = params['id']

        this._userService.get_user(this.id).subscribe(
          response => {
            this.user = response.user;

          },
          error => {

          }
        )

      })

    }else{

      this.route.navigate([('')]);

    }

  }

  onSubmit(userForm: any){
    if(userForm.valid){
      this._userService.put_user({
        id:this.id,
        nombres : userForm.value.nombres,
        apellidos : userForm.value.apellidos,
        cedula : userForm.value.cedula,
        email : userForm.value.email,
        password : userForm.value.password,
        role : userForm.value.role,
      }).subscribe(
        response => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario actualizado correctamente!',
            footer: '<p>Tecno Service Messages</p>',
            showConfirmButton: false,
            timer: 1500
          })

          this.route.navigate(['users'])


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
