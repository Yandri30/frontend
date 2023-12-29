import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-index',
  templateUrl: './cliente-index.component.html',
  styleUrls: ['./cliente-index.component.css']
})
export class ClienteIndexComponent implements OnInit {

  public clientes:any;
  public p:any;

  constructor(
    private _clienteService : ClienteService
  ) { }

  ngOnInit(): void {

    this._clienteService.get_clientes().subscribe(
      response => {
        this.clientes = response.clientes
        console.log(this.clientes);
        
      },
      error => {

      }
    )

  }

  eliminarCliente(id:any){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mx-3',
        cancelButton: 'btn btn-danger mx-3'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Seguro quieres eliminar el producto?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Eliminado!',
          'El producto fue eliminado correctamente.',
          'success'
        )

        this._clienteService.eliminar_cliente(id).subscribe(
          response => {
            this._clienteService.get_clientes().subscribe(
              response => {
                this.clientes = response.clientes;
              },
              error => {

              }
            )
          },
          error => {

          }
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Se canceló la petición',
          'error'
        )
      }
    })
  }

}
