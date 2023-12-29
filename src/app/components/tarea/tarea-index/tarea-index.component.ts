import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TareaService } from 'src/app/services/tarea.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tarea-index',
  templateUrl: './tarea-index.component.html',
  styleUrls: ['./tarea-index.component.css']
})
export class TareaIndexComponent implements OnInit {

  public tareas : any;
  public url;
  public filtroText: any;
  public p : any;
  public identity : any;

  constructor(

    private _tareaService : TareaService,
    private _userService : UserService,
    private route : Router

  ) {

    this.url = environment.url;
    this.identity = this._userService.getIdentity();

   }

  ngOnInit(): void {

    if(this.identity.role == 'TECNICO'){
      this._tareaService.get_tareaUser(this.identity._id).subscribe(
        response => {
          this.tareas = response.tareas;
        },
        error => {
  
        }
      )

    } else{
      if(this.identity.role == 'ADMIN'){
        this._tareaService.get_tareasAdmin('').subscribe(
          response => {
            this.tareas = response.tareas;
          },
          error => {
    
          }
        )
  
      }else{
        this.route.navigate([('')]);
      }
    }

  }

  search(searchForm: { value: { filtro: any; }; }){
    
    this._tareaService.get_tareas(this.identity._id, searchForm.value.filtro).subscribe(
      response => {
        this.tareas = response.tareas;
      }
    )

  }

  searchAdmin(searchAdminForm: { value: { filtro: any; }; }){
    this._tareaService.get_tareasAdmin(searchAdminForm.value.filtro).subscribe(
      response => {
        this.tareas = response.tareas;
      }
    )
  }

  eliminarTarea(id:any){
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

        this._tareaService.eliminar_tarea(id).subscribe(
          response => {
            if(this.identity.role == 'TECNICO'){
              this._tareaService.get_tareaUser(this.identity._id).subscribe(
                response => {
                  this.tareas = response.tareas;
                },
                error => {
          
                }
              )
        
            } else{
              if(this.identity.role == 'ADMIN'){
                this._tareaService.get_tareasAdmin('').subscribe(
                  response => {
                    this.tareas = response.tareas;
                  },
                  error => {
            
                  }
                )
          
              }
            }
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
