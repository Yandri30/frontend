import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { ScriptUploadService } from 'src/app/services/script-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-edit',
  templateUrl: './cliente-edit.component.html',
  styleUrls: ['./cliente-edit.component.css']
})
export class ClienteEditComponent implements OnInit {

  public id:any;
  public cliente:any = {};

  constructor(
    private _route : ActivatedRoute,
    private _clienteService : ClienteService,
    private router : Router,
    private _uploadScriptService : ScriptUploadService
  ) {
    this._uploadScriptService.Upload(["validacionCliente"]);
   }

  ngOnInit(): void {

    this._route.params.subscribe(
      params => {
        this.id = params['id']

        this._clienteService.get_cliente(this.id).subscribe(
          response => {
            console.log(response);
            this.cliente = response.cliente //INICIALIZAMOS CLIENTE CON LO QUE TENGAMOS EN EL RESPONSE

          },
          error => {

          }
        )
      },
      error => {

      }
    )

  }

  onSubmit(clienteForm:any){

    if(clienteForm.valid){

      this._clienteService.act_cliente({
        id: this.id,
        nombres: clienteForm.value.nombres,
        cedula: clienteForm.value.cedula,
        correo: clienteForm.value.correo,
        telefono: clienteForm.value.telefono,
        direccion: clienteForm.value.direccion,
      }).subscribe(
        response => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se actualizó el cliente con éxito!',
            footer: '<p>Tecno Service Messages</p>',
            showConfirmButton: false,
            timer: 1500
          })

          this.router.navigate(['clientes'])
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
