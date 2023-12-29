import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-venta-index',
  templateUrl: './venta-index.component.html',
  styleUrls: ['./venta-index.component.css']
})
export class VentaIndexComponent implements OnInit {

  public ventas: any;
  public identity : any;

  constructor(

    private _ventasService : VentaService,
    private _userService : UserService,
    private route : Router

  ) {

    this.identity = this._userService.getIdentity();

  }

  ngOnInit(): void {

    if(this.identity.role == 'VENDEDOR'){
      this._ventasService.get_ventasUser(this.identity.id).subscribe(
        response => {
          this.ventas = response.ventas;
        },
        error => {

        }
      )

    } else{
      if(this.identity.role == 'ADMIN'){
        this._ventasService.get_ventas().subscribe(
          response => {

            console.log(response);
            this.ventas = response.ventas;
          },
          error => {

          }
        )

      }else{
        this.route.navigate([('')]);
      }
    }

  }

}
