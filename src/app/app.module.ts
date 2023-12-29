import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {NgxPaginationModule} from 'ngx-pagination';

//UPLOAD SCRIPTS
import { ScriptUploadService } from './services/script-upload.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/general/page-not-found/page-not-found.component';
import { LoginComponent } from './components/general/login/login.component';
import { UserCreateComponent } from './components/users/user-create/user-create.component';
import { ProductoCreateComponent } from './components/productos/producto-create/producto-create.component';
import { ProductoIndexComponent } from './components/productos/producto-index/producto-index.component';
import { ProductoEditComponent } from './components/productos/producto-edit/producto-edit.component';
import { UserEditComponent } from './components/users/user-edit/user-edit.component';
import { UserIndexComponent } from './components/users/user-index/user-index.component';
import { VentaCreateComponent } from './components/ventas/venta-create/venta-create.component';
import { VentaDetalleComponent } from './components/ventas/venta-detalle/venta-detalle.component';
import { VentaIndexComponent } from './components/ventas/venta-index/venta-index.component';
import { SidebarComponent } from './components/general/sidebar/sidebar.component';
import { ClienteIndexComponent } from './components/clientes/cliente-index/cliente-index.component';
import { ClienteCreateComponent } from './components/clientes/cliente-create/cliente-create.component';
import { ClienteEditComponent } from './components/clientes/cliente-edit/cliente-edit.component';
import { InicioComponent } from './components/general/inicio/inicio.component';
import { TareaIndexComponent } from './components/tarea/tarea-index/tarea-index.component';
import { TareaEditComponent } from './components/tarea/tarea-edit/tarea-edit.component';
import { TareaCreateComponent } from './components/tarea/tarea-create/tarea-create.component';
import { TareaViewComponent } from './components/tarea/tarea-view/tarea-view.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    UserCreateComponent,
    ProductoCreateComponent,
    ProductoIndexComponent,
    ProductoEditComponent,
    UserEditComponent,
    UserIndexComponent,
    VentaCreateComponent,
    VentaDetalleComponent,
    VentaIndexComponent,
    SidebarComponent,
    ClienteIndexComponent,
    ClienteCreateComponent,
    ClienteEditComponent,
    InicioComponent,
    TareaIndexComponent,
    TareaEditComponent,
    TareaCreateComponent,
    TareaViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [
    ScriptUploadService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
