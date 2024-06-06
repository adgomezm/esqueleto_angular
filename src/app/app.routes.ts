import { Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { BusquedaComponent } from './components/pages/busqueda/busqueda.component';
import { EntidadComponent } from './components/pages/entidad/entidad.component';

export const routes: Routes = [
  { path: 'busqueda', component: BusquedaComponent },
  { path: 'entidad', component: EntidadComponent },
  { path: 'login', component: LoginComponent },
  { path:'*', component: NotFoundComponent }
];
