import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './../seguranca/auth.guard';
import { PerfilCadastroComponent } from './../perfis/perfil-cadastro/perfil-cadastro.component';
import { PerfilPesquisaComponent } from './../perfis/perfil-pesquisa/perfil-pesquisa.component';

const routes: Routes = [
  {
    path: '',
    component: PerfilPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_FUNCIONARIO'] }
  },
  {
    path: 'novo',
    component: PerfilCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMINISTRADOR'] }
  },
  {
    path: ':codigo',
    component: PerfilCadastroComponent,
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
export class PerfisRoutingModule { }
