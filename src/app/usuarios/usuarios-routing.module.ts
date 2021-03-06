import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './../seguranca/auth.guard';
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';
import { UsuarioPesquisaComponent } from './usuario-pesquisa/usuario-pesquisa.component';

const routes: Routes = [
  {
    path: 'usuarios',
    component: UsuarioPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_FUNCIONARIO'] }
  },
  {
    path: 'usuarios/novo',
    component: UsuarioCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMINISTRADOR'] }
  },
  {
    path: 'usuarios/:codigo',
    component: UsuarioCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMINISTRADOR'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
