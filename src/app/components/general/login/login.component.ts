import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../../models/User';
import Swal from 'sweetalert2';
import { ScriptUploadService } from 'src/app/services/script-upload.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public user;
  public token: any;
  public identity: any;
  public data_error: any;
  public cookieValue: any;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _uploadScriptService: ScriptUploadService
  ) {
    this.identity = this._userService.getIdentity();
    this.user = new User('', '', '', '', '', '', '', '');
    this._uploadScriptService.Upload(['validaciones']);
  }

  ngOnInit(): void {
    //VALIDACION DE LOGIN
    if (
      this.identity.role == 'ADMIN' ||
      this.identity.role == 'VENDEDOR' ||
      this.identity.role == 'TECNICO'
    ) {
      this._router.navigate(['inicio']);
    }
  }

  login(loginForm: any) {
    //COMPROBAMOS EL FORMULARIO SEA VÁLIDO
    if (loginForm.valid) {
      this._userService.login(this.user).subscribe(
        (response) => {
          //ALMACENAMOS EL TOKEN EN EL LOCAL STORAGE DEL NAVEGADOR
          this.token = response.jwt;
          localStorage.setItem('token', this.token);

          this._userService.login(this.user, true).subscribe(
            (response) => {
              const user = response.user;
              localStorage.setItem('identity', JSON.stringify(response.user));
              Swal.fire({
                title: 'Éxito',
                text: `Bienvenido, ${user.nombres}!`,
                icon: 'success',
                position: 'top-end',
                toast: true,
                showConfirmButton: false,
                timer: 3000,
              });
              //LO RETORNAMOS A UNA NUEVA VISTA
              this._router.navigate(['inicio']);
            },
            (error) => {}
          );
        },
        (error) => {
          Swal.fire({
            title: 'Error',
            text: 'Tus credenciales son incorrectas',
            icon: 'error',
            position: 'top-end',
            toast: true,
            showConfirmButton: false,
            timer: 3000,
          });
        }
      );
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Ambos campos son obligatorios',
        icon: 'error',
        position: 'top-end',
        toast: true,
        showConfirmButton: false,
        timer: 3000,
      });
    }
  }
}
