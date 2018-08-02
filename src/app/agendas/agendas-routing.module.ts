import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './../seguranca/auth.guard';
import { AgendaPesquisaComponent } from './agenda-pesquisa/agenda-pesquisa.component';
import { AgendaCadastroComponent } from './agenda-cadastro/agenda-cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: AgendaPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_USUARIO'] }
  },
  {
    path: 'nova',
    component: AgendaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_USUARIO'] }
  },
  {
    path: ':codigo',
    component: AgendaCadastroComponent,
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
export class AgendasRoutingModule { }
