import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './../seguranca/auth.guard';
import { MedicoCadastroComponent } from './medico-cadastro/medico-cadastro.component';
import { MedicoPesquisaComponent } from './medico-pesquisa/medico-pesquisa.component';

const routes: Routes = [
  {
    path: '',
    component: MedicoPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_MEDICO'] }
  },
  {
    path: 'novo',
    component: MedicoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_MEDICO'] }
  },
  {
    path: ':codigo',
    component: MedicoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_MEDICO'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MedicosRoutingModule { }
