import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ProductoService } from 'src/app/services/producto.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto-index',
  templateUrl: './producto-index.component.html',
  styleUrls: ['./producto-index.component.css']
})
export class ProductoIndexComponent implements OnInit {

  public productos: any;
  public url;
  public filtrotext: any;
  public categorias:any;
  public titulo_catText:any;
  public descripcion_catText:any;
  public p:any;
  public producto_stockText: any;
  public producto_id:any;
  public identity : any;

  constructor(

    //INICIALIZAMOS EL SERVICIO DE PRODUCTO
    private _productoService : ProductoService,
    private _userService : UserService,
    private route : Router,
  ) {

    this.url = environment.url;
    this.identity = this._userService.getIdentity();

  }

  ngOnInit(): void {

    if(this.identity.role == 'ADMIN' || this.identity.role == 'VENDEDOR'){

      this._productoService.get_productos('').subscribe(
        response => {
          console.log(response);

          this.productos = response.productos;

        },
        error => {
          console.log(error);

        }
      );

      this._productoService.get_categorias().subscribe(
        response => {
          this.categorias = response.categorias;
        },
        error => {

        }
      )

    }else{
      this.route.navigate([('')]);
    }

  }

  search(searchForm: { value: { filtro: any; }; }){

    this._productoService.get_productos(searchForm.value.filtro).subscribe(
      response =>{
        this.productos = response.productos;
      },
      error => {

      }
    )

  }

  registrar_cat(categoriaForm:any){

    if(categoriaForm.valid){
      this._productoService.post_categoria({
        titulo: categoriaForm.value.titulo_cat,
        descripcion: categoriaForm.value.descripcion_cat
      }).subscribe(
        response => {
          this._productoService.get_categorias().subscribe(
            response => {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Proveedor creado con éxito',
                footer: '<p>El Señuelo Messages</p>',
                showConfirmButton: false,
                timer: 1500
              })
              //ACTUALIZAMOS LAS CATEGORIAS PARA LISTAR LA NUEVA CREADA
              this.categorias = response.categorias;
            },
            error => {

            }
          )
        },
        error => {

        }
      );

    }else{
      Swal.fire({
        icon: 'error',
        title: 'Algo salió mal!',
        text: 'Rellena todos los campos del formulario!',
        footer: '<p>El Señuelo Messages</p>'
      })
    }

  }

  eliminarCategoria(id: any){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mx-3',
        cancelButton: 'btn btn-danger mx-3'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Seguro quieres eliminar este proveedor?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Eliminada!',
          'El proveedor fue eliminado correctamente.',
          'success'
        )
        this.route.navigate([('/productos')]);
        this._productoService.delete_categoria(id).subscribe(
          response => {
            this._productoService.get_categorias().subscribe(
              response => {
                this.categorias = response.categorias;
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

  eliminarProducto(id: any){
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

        this._productoService.eliminar_producto(id).subscribe(
          response => {
            this._productoService.get_productos('').subscribe(
              response => {
                this.productos = response.productos;
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

  get_id(id:any){
    this.producto_id=id;
  }

  aumentar_stock(stockForm:any){
    if(stockForm.valid){
      if(this.producto_stockText < 1){
        Swal.fire({
          icon: 'error',
          title: 'Algo salió mal!',
          text: 'La cantidad a aumentar no puede ser menor que 1!',
          footer: '<p>El Señuelo Messages</p>'
        })
      } else if(this.producto_id){
        this._productoService.act_stock({
          id: this.producto_id,
          stock: stockForm.value.producto_stock,
        }).subscribe(
          response => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Stock actualizado con éxito!',
              footer: '<p>El Señuelo Messages</p>',
              showConfirmButton: false,
              timer: 1500
            });
            this._productoService.get_productos('').subscribe(
              response =>{
                this.productos = response.productos
              }
            )
          }
        )
      }

    }else{
      Swal.fire({
        icon: 'error',
        title: 'Algo salió mal!',
        text: 'Revisa los datos del formulario!',
        footer: '<p>Tecno Service Messages</p>'
      })
    }
  }

}
