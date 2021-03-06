import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NaoAutorizadoComponent } from './core/nao-autorizado.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';


const routes: Routes = [

  { path: 'agendas', loadChildren: 'app/agendas/agendas.module#AgendasModule' },
  { path: 'medicos', loadChildren: 'app/medicos/medicos.module#MedicosModule' },
  { path: 'receitas', loadChildren: 'app/receitas/receitas.module#ReceitasModule' },
  { path: 'exames', loadChildren: 'app/exames/exames.module#ExamesModule' },
  { path: 'pacientes', loadChildren: 'app/pacientes/pacientes.module#PacientesModule' },
  { path: 'prontuarios', loadChildren: 'app/prontuarios/prontuarios.module#ProntuariosModule' },
  { path: 'solicitacoes', loadChildren: 'app/solicitacoes/solicitacoes.module#SolicitacoesModule' },
  { path: 'usuarios', loadChildren: 'app/usuarios/usuarios.module#UsuariosModule' },
  { path: 'funcionarios', loadChildren: 'app/funcionarios/funcionarios.module#FuncionariosModule' },
  { path: 'perfis', loadChildren: 'app/perfis/perfis.module#PerfisModule' },
  { path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule'},
  { path: 'relatorios', loadChildren: 'app/relatorios/relatorios.module#RelatoriosModule' },
  { path: 'pessoas', loadChildren: 'app/pessoas/pessoas.module#PessoasModule' },

  { path: '', redirectTo: 'agendas/nova', pathMatch: 'full' },
  { path: 'nao-autorizado', component: NaoAutorizadoComponent },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
