import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './../seguranca/auth.guard';
import { ProntuarioCadastroComponent } from './prontuario-cadastro/prontuario-cadastro.component';
import { ProntuarioPesquisaComponent } from './prontuario-pesquisa/prontuario-pesquisa.component';

const routes: Routes = [
  {
    path: '',
    component: ProntuarioPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_FUNCIONARIO'] }
  },
  {
    path: 'novo',
    component: ProntuarioCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_MEDICO'] }
  },
  {
    path: ':codigo',
    component: ProntuarioCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_FUNCIONARIO'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProntuariosRoutingModule { }
