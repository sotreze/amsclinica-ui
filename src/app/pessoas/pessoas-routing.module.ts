import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './../seguranca/auth.guard';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';

const routes: Routes = [
  {
    path: '',
    component: PessoasPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_USUARIO'] }
  },
  {
    path: 'nova',
    component: PessoaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_FUNCIONARIO'] }
  },
  {
    path: ':codigo',
    component: PessoaCadastroComponent,
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
export class PessoasRoutingModule { }
