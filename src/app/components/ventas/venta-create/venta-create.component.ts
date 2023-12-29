import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { ProductoService } from 'src/app/services/producto.service';
import { UserService } from 'src/app/services/user.service';
import { VentaService } from 'src/app/services/venta.service';
import Swal from 'sweetalert2';

import {DetalleVenta} from "../../../models/DetalleVenta"
import {Venta} from "../../../models/Venta"

interface HtmlSelectEvent extends Event{
  target: HTMLSelectElement & EventTarget;
}

@Component({
  selector: 'app-venta-create',
  templateUrl: './venta-create.component.html',
  styleUrls: ['./venta-create.component.css']
})
export class VentaCreateComponent implements OnInit {

  public identity : any;
  public clientes : any;
  public venta : any = {
    idcliente : '',
  };
  public productos : any;
  public producto : any = {
    stock : '--|--',
  }
  public data_detalle : Array<any> = [];
  public detalle : any = {
    idproducto : '',
  };
  public subtotal = 0;
  public iva = 0;
  public valor_iva = 0.12;
  public total = 0;

  constructor(

    private _userService : UserService,
    private _productoService : ProductoService,
    private _clienteService : ClienteService,
    private _ventaService : VentaService,
    private _router : Router,

  ) {

    this.identity = this._userService.getIdentity();

   }

  ngOnInit(): void {

    if(this,this.identity.role == 'ADMIN' || this.identity.role == 'VENDEDOR'){

      this._clienteService.get_clientes().subscribe(
        response => {
          this.clientes = response.clientes;


        }
      );

      this._productoService.get_productos('').subscribe(
        response => {
          this.productos = response.productos;


        }
      )
    }else{

      this._router.navigate([''])

    }

  }

  onSelect(id : any | HtmlSelectEvent){

    if(id.target.value){
      id = id.target.value;

      this._productoService.get_producto(id).subscribe(
        response => {
          this.producto = response.producto;

        }
      )

    }

  }



  save_detalle(detalleForm : any){

    if(detalleForm.valid){
      //VALIDACION DE QUE LA CANTIDAD NO PUEDE SER MAYOR AL STOCK
      if(detalleForm.value.cantidad < 0){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'La cantidad ingresada no puede ser menor a 0!',
          footer: '<p>El Señuelo Message</p>'
        })
      }else if(detalleForm.value.cantidad <= this.producto.stock){
        this.data_detalle.push({
          idproducto : detalleForm.value.idproducto,
          cantidad : detalleForm.value.cantidad,
          producto : this.producto.titulo,
          precio_venta : this.producto.precio_venta
        })

        this.detalle = new DetalleVenta('','',null);
        this.producto.stock = '--|--'
        // SUBTOTAL
        this.subtotal = this.subtotal + (parseInt(this.producto.precio_venta) * parseInt(detalleForm.value.cantidad))
        //IVA
        this.iva = parseInt((this.subtotal * this.valor_iva).toFixed(2));
        //TOTAL DE VENTA
        this.total = this.subtotal + this.iva

      }else{
        //MENSAJE DE ERROR
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'La cantidad ingresada no puede superar el stock!',
          footer: '<p>El Señuelo Message</p>'
        })
      }


    }else{

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes seleccionar un producto e ingresar una cantidad!',
        footer: '<p>El Señuelo Message</p>'
      })

    }

  }

  eliminar(idx: any, precio_venta: any, cantidad: any){
    //CON EL METODO SPLICE BORRAMOS EL REGISTRO AGREGADO
    this.data_detalle.splice(idx,1);
    //ACTUALIZAMOS EL SUBTOTALL
    this.subtotal = this.subtotal - (parseInt(precio_venta) * parseInt(cantidad));
    //ACTUALIZAMOS EL IVA
    this.iva = parseInt((this.subtotal * this.valor_iva).toFixed(2));
    //ACTUALIZAMOS EL TOTAL
    this.total = this.subtotal + this.iva

  }

  onSubmit(ventaForm:any){
    if(ventaForm.valid || ventaForm.value.idcliente != ''){
      Swal.fire({
        title: '¿Estas seguro que quieres registrar la venta?',
        text: "No podrás cambiar los datos una vez registrados en el sistema!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, registrar venta!',
        footer: '<p>El Señuelo Message</p>'
      }).then((result) => {
        if (result.isConfirmed) {
          let data = {
            idcliente: ventaForm.value.idcliente,
            iduser: this.identity.id,
            detalles: this.data_detalle,
          }

          console.log(data);


          //REGISTRO DE VENTA
          this._ventaService.save_venta(data).subscribe(
            response => {
              this._router.navigate(['ventas'])
              Swal.fire(
                'Venta registrada con éxito!',
                'La venta fue registrada',
                'success'
              )
            },
            error => {
              console.log(error);
            }
          )
        }
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Selecciona un cliente!',
        footer: '<p>El Señuelo Message</p>'
      })
    }
  }

}

