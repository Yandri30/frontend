import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user.service';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-venta-detalle',
  templateUrl: './venta-detalle.component.html',
  styleUrls: ['./venta-detalle.component.css']
})
export class VentaDetalleComponent implements OnInit {

  public id : any;
  public url;
  public identity : any;
  public venta :any = {
    //INICIALIZAMOS LAS VARIABLES PARA CORREGIR ERRORES EN CONSOLA
    iduser : '',
    idcliente: ''
  };
  public detalleVenta : any;

  constructor(

    private _route : ActivatedRoute,
    private _ventaService : VentaService,
    private _userService : UserService,
    private _router : Router

  ) {

    this.url = environment.url;
    this.identity = this._userService.getIdentity();

  }

  ngOnInit(): void {

    if(this.identity.role == 'VENDEDOR' || this.identity.role == 'ADMIN'){
      this._route.params.subscribe(
        params => {
          this.id = params['id']

          this._ventaService.get_detalles_venta(this.id).subscribe(
            response =>{
              console.log(response);

              this.venta = response.data.venta;
              this.detalleVenta = response.data.detalles;
            },
            error => {

            }
          )
        }
      )
    }else{
      this._router.navigate(['']);
    }



  }

}
