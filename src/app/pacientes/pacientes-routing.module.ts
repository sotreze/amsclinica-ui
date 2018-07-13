import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './../seguranca/auth.guard';
import { PacienteCadastroComponent } from './paciente-cadastro/paciente-cadastro.component';
import { PacientePesquisaComponent } from './paciente-pesquisa/paciente-pesquisa.component';

const routes: Routes = [
  {
    path: '',
    component: PacientePesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_PACIENTE'] }
  },
  {
    path: 'novo',
    component: PacienteCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_PACIENTE'] }
  },
  {
    path: ':codigo',
    component: PacienteCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_PACIENTE'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PacientesRoutingModule { }
