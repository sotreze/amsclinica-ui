import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './../seguranca/auth.guard';
import { SolicitacaoCadastroComponent } from './../solicitacoes/solicitacao-cadastro/solicitacao-cadastro.component';
import { SolicitacaoPesquisaComponent } from './../solicitacoes/solicitacao-pesquisa/solicitacao-pesquisa.component';

const routes: Routes = [
  {
    path: '',
    component: SolicitacaoPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_USUARIO'] }
  },
  {
    path: 'nova',
    component: SolicitacaoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_USUARIO'] }
  },
  {
    path: ':codigo',
    component: SolicitacaoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_USUARIO'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SolicitacoesRoutingModule { }
