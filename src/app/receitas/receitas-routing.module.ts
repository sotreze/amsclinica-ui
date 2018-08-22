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
    data: { roles: ['ROLE_FUNCIONARIO'] }
  },
  {
    path: 'nova',
    component: ReceitaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_MEDICO'] }
  },
  {
    path: ':codigo',
    component: ReceitaCadastroComponent,
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
export class ReceitasRoutingModule { }
