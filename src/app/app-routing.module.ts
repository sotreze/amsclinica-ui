import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NaoAutorizadoComponent } from './core/nao-autorizado.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamentos/lancamento-cadastro/lancamento-cadastro.component';
import { LancamentoPesquisaComponent } from './lancamentos/lancamento-pesquisa/lancamento-pesquisa.component';
import { ProntuarioCadastroComponent } from './prontuarios/prontuario-cadastro/prontuario-cadastro.component';
import { ProntuarioPesquisaComponent } from './prontuarios/prontuario-pesquisa/prontuario-pesquisa.component';
import { MedicoPesquisaComponent } from './medicos/medico-pesquisa/medico-pesquisa.component';
import { ReceitaCadastroComponent } from './receitas/receita-cadastro/receita-cadastro.component';

const routes: Routes = [

  { path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule'},
  { path: 'lancamentos', loadChildren: 'app/lancamentos/lancamentos.module#LancamentosModule' },
  { path: 'pessoas', loadChildren: 'app/pessoas/pessoas.module#PessoasModule' },
  { path: 'usuarios', loadChildren: 'app/usuarios/usuarios.module#UsuariosModule' },
  { path: 'funcionarios', loadChildren: 'app/funcionarios/funcionarios.module#FuncionariosModule' },
  { path: 'pacientes', loadChildren: 'app/pacientes/pacientes.module#PacientesModule' },
  { path: 'prontuarios', loadChildren: 'app/prontuarios/prontuarios.module#ProntuariosModule' },
  { path: 'medicos', loadChildren: 'app/medicos/medicos.module#MedicosModule' },
  { path: 'receitas', loadChildren: 'app/receitas/receitas.module#ReceitasModule' },
  { path: 'relatorios', loadChildren: 'app/relatorios/relatorios.module#RelatoriosModule' },

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
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
