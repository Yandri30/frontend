import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { ScriptUploadService } from 'src/app/services/script-upload.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  public cliente;

  constructor(

    private _clienteService : ClienteService,
    private router : Router,
    private _uploadScriptService : ScriptUploadService

  ) {

    this.cliente = new Cliente('','','','','','');
    this._uploadScriptService.Upload(["validacionCliente"]);

  }

  ngOnInit(): void {
  }

  onSubmit(clienteForm:any){

    if(clienteForm.valid){

      this._clienteService.post_clientes({
        nombres: clienteForm.value.nombres,
        correo: clienteForm.value.correo,
        cedula: clienteForm.value.cedula,
        direccion: clienteForm.value.direccion,
        telefono: clienteForm.value.telefono,
      }).subscribe(
        response => {
          console.log(response);

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se registró el cliente con éxito!',
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
