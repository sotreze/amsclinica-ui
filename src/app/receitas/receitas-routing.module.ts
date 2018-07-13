import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './../seguranca/auth.guard';
import { ReceitaPesquisaComponent } from './receita-pesquisa/receita-pesquisa.component';
import { ReceitaCadastroComponent } from './receita-cadastro/receita-cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: ReceitaPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_RECEITA'] }
  },
  {
    path: 'nova',
    component: ReceitaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_RECEITA'] }
  },
  {
    path: ':codigo',
    component: ReceitaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_RECEITA'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ReceitasRoutingModule { }
