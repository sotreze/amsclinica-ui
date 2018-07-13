import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './../seguranca/auth.guard';
import { FuncionarioCadastroComponent } from './funcionario-cadastro/funcionario-cadastro.component';
import { FuncionarioPesquisaComponent } from './funcionario-pesquisa/funcionario-pesquisa.component';

const routes: Routes = [
  {
    path: '',
    component: FuncionarioPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_FUNCIONARIO'] }
  },
  {
    path: 'novo',
    component: FuncionarioCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_FUNCIONARIO'] }
  },
  {
    path: ':codigo',
    component: FuncionarioCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_FUNCIONARIO'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FuncionariosRoutingModule { }
