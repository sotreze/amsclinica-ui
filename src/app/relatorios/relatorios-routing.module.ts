import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelatorioLancamentosComponent } from './relatorio-lancamentos/relatorio-lancamentos.component';
import { AuthGuard } from '../seguranca/auth.guard';

const routes: Routes = [
  {
    path: 'agendas',
    component: RelatorioLancamentosComponent,
    canActivate: [ AuthGuard ],
    data: { roles: ['ROLE_FUNCIONARIO'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatoriosRoutingModule { }
