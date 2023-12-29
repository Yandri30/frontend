import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.css']
})
export class UserIndexComponent implements OnInit {

  public users:any;
  public url;
  public filtroText : any;
  public identity : any;
  public p : any;
  
  constructor(

    private _userService : UserService,
    private router : Router

  ) { 

    this.url = environment.url;
    this.identity = _userService.getIdentity();

  }

  ngOnInit(): void {

    if(this.identity.role == 'ADMIN'){
      this._userService.get_users('').subscribe(
        response => {
          this.users = response.users;        
          
        },
        error => {
  
        }
      )
    }else{

      this.router.navigate([''])

    }


  }

  search(searchForm: { value: { filtro: any; }; }){

    this._userService.get_users(searchForm.value.filtro).subscribe(
      response =>{
        this.users = response.users;
      },
      error => {
        
      }
    )
    
  }

  eliminarUsuario(id:any){
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
          'El usuario fue eliminado correctamente.',
          'success'
        )

        this._userService.eliminar_user(id).subscribe(
          response => {
            this._userService.get_users('').subscribe(
              response => {
                this.users = response.users;
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
