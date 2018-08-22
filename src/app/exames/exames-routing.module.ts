import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './../seguranca/auth.guard';
import { ExamePesquisaComponent } from './exame-pesquisa/exame-pesquisa.component';
import { ExameCadastroComponent } from './exame-cadastro/exame-cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: ExamePesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_FUNCIONARIO'] }
  },
  {
    path: 'novo',
    component: ExameCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_MEDICO']}
  },
  {
    path: ':codigo',
    component: ExameCadastroComponent,
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
export class ExamesRoutingModule { }
