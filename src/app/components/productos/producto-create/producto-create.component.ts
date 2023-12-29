import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { UserService } from 'src/app/services/user.service';
import { ScriptUploadService } from 'src/app/services/script-upload.service';
import Swal from 'sweetalert2';
import {Producto} from '../../../models/Producto'

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-producto-create',
  templateUrl: './producto-create.component.html',
  styleUrls: ['./producto-create.component.css']
})
export class ProductoCreateComponent implements OnInit {

  public producto;
  public file: any | File;
  public imgSelect: any | String | ArrayBuffer;
  public categorias: any;
  public data_error: any;
  public identity : any;

  constructor(

    private _productoService: ProductoService,
    private _userService : UserService,
    private router : Router,
    private _uploadScriptService : ScriptUploadService

  ) {

    this.producto = new Producto('','','',1,1,1,'',1) //SI ES UN NUMERO SE COLOCA UN 1
    this.identity = this._userService.getIdentity();
    this._uploadScriptService.Upload(["validacionProducto"]);

  }

  ngOnInit(): void {

    if(this.identity.role == 'ADMIN'){

      this._productoService.get_categorias().subscribe(
        response => {
          this.categorias = response.categorias;

        },
        error =>{

        }
      )

    }else{

      this.router.navigate([('')]);

    }

  }

  onSubmit(productoForm: any){
    console.log(productoForm.value);

    if(productoForm.valid){

      this._productoService.post_producto({
        titulo: productoForm.value.titulo,
        descripcion: productoForm.value.descripcion,
        precio_compra: productoForm.value.precio_compra,
        precio_venta: productoForm.value.precio_venta,
        stock: productoForm.value.stock,
        idcategoria: productoForm.value.idcategoria,
        puntos: productoForm.value.puntos,
      }).subscribe(
        response => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Producto registrado correctamente!',
            footer: '<p>Tecno Service Messages</p>',
            showConfirmButton: false,
            timer: 1500
          })
          this.producto = new Producto('','','',1,1,1,'',1) //PARA QUE SE PONGAN EN BLANCO LOS CAMPOS
          this.imgSelect = '../../../../assets/img/default.png'; //PARA QUE SE LIMPIE EL CAMPO DE LA IMG
          this.router.navigate(['productos'])
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Algo salió mal!',
            text: 'Debes establecer una imagen!',
            footer: '<p>Tecno Service Messages</p>'
          })
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

  imgSelected(event: any | HtmlInputEvent){
    if(event.target.files && event.target.files[0]){

      this.file = <File>event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imgSelect = reader.result;
      reader.readAsDataURL(this.file);

    }
  }

}
