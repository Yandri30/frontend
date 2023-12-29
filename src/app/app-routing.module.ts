import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteCreateComponent } from './components/clientes/cliente-create/cliente-create.component';
import { ClienteEditComponent } from './components/clientes/cliente-edit/cliente-edit.component';
import { ClienteIndexComponent } from './components/clientes/cliente-index/cliente-index.component';
import { InicioComponent } from './components/general/inicio/inicio.component';
import { LoginComponent } from './components/general/login/login.component';
import { PageNotFoundComponent } from './components/general/page-not-found/page-not-found.component';
import { ProductoCreateComponent } from './components/productos/producto-create/producto-create.component';
import { ProductoEditComponent } from './components/productos/producto-edit/producto-edit.component';
import { ProductoIndexComponent } from './components/productos/producto-index/producto-index.component';
import { TareaCreateComponent } from './components/tarea/tarea-create/tarea-create.component';
import { TareaEditComponent } from './components/tarea/tarea-edit/tarea-edit.component';
import { TareaIndexComponent } from './components/tarea/tarea-index/tarea-index.component';
import { TareaViewComponent } from './components/tarea/tarea-view/tarea-view.component';
import { UserCreateComponent } from './components/users/user-create/user-create.component';
import { UserEditComponent } from './components/users/user-edit/user-edit.component';
import { UserIndexComponent } from './components/users/user-index/user-index.component';
import { VentaCreateComponent } from './components/ventas/venta-create/venta-create.component';
import { VentaDetalleComponent } from './components/ventas/venta-detalle/venta-detalle.component';
import { VentaIndexComponent } from './components/ventas/venta-index/venta-index.component';

const routes: Routes = [

  //RUTAS GENERALES
  {path: '', component: LoginComponent},
  {path: 'inicio', component: InicioComponent},
  {path: 'users', component: UserIndexComponent},
  {path: 'clientes', component: ClienteIndexComponent},
  {path: 'ventas', component: VentaIndexComponent},
  {path: 'productos', component: ProductoIndexComponent},
  {path: 'tareas', component: TareaIndexComponent},


  //RUTAS DE CONTROLADORES
  {path: 'user/registrar', component: UserCreateComponent}, //RUTA PARA REGISTRAR USUARIO
  {path: 'user/editar/:id', component: UserEditComponent}, //RUTA PARA EDITAR USUARIO
  {path: 'producto/registrar', component: ProductoCreateComponent}, //RUTA PARA  REGISTRAR PRODUCTOS
  {path: 'producto/editar/:id', component: ProductoEditComponent}, //RUTA PARA EDITAR PRODUCTOS
  {path: 'cliente/registrar', component: ClienteCreateComponent}, //RUTA PARA REGISTRAR CLIENTES
  {path: 'cliente/editar/:id', component: ClienteEditComponent}, //RUTA PARA EDITAR CLIENTES
  {path: 'tarea/registrar', component: TareaCreateComponent}, //RUTA PARA REGISTRAR TAREA
  {path: 'tarea/editar/:id', component: TareaEditComponent}, //RUTA PARA EDITAR USUARIO
  {path: 'tarea/view/:id', component: TareaViewComponent}, //RUTA PARA VER USUARIO
  {path: 'venta/registrar', component: VentaCreateComponent}, //RUTA PARA REGISTRAR VENTA
  {path: 'venta/detalle/:id', component: VentaDetalleComponent}, //RUTA PARA DETALLE DE VENTA

  //PAGINA 404
  {path: '**', component: PageNotFoundComponent} //Ruta para pagina no encontrada

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
