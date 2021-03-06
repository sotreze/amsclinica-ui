import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastyModule } from 'ng2-toasty';
import { JwtHelper } from 'angular2-jwt';


import { AuthService } from './../seguranca/auth.service';
import { ErrorHandlerService } from './error-handler.service';
import { PessoaService } from './../pessoas/pessoa.service';
import { FuncionarioService } from './../funcionarios/funcionario.service';
import { PacienteService } from './../pacientes/paciente.service';
import { PerfilService } from './../perfis/perfil.service';
import { UsuarioService } from './../usuarios/usuario.service';
import { TipoExameService } from './../tipos-exames/tipo-exame.service';
import { CategoriaService } from './../categorias/categoria.service';
import { PermissaoService } from './../permissoes/permissao.service';
import { MedicacaoService } from './../medicacoes/medicacao.service';
import { ReceitaService } from './../receitas/receita.service';
import { ExameService } from './../exames/exame.service';
import { AgendaService } from './../agendas/agenda.service';
import { ProntuarioService } from './../prontuarios/prontuario.service';
import { SolicitacaoService } from './../solicitacoes/solicitacao.service';
import { MedicoService } from './../medicos/medico.service';
import { DashboardService } from './../dashboard/dashboard.service';
import { RelatoriosService } from './../relatorios/relatorios.service';
import { NavbarComponent } from './navbar/navbar.component';
import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';

import {TabMenuModule, MenuItem, MenuModule} from 'primeng/primeng';


registerLocaleData(localePt);

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule,

    TabMenuModule,
    MenuModule,

    ToastyModule.forRoot(),
    ConfirmDialogModule
  ],
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent

  ],
  exports: [
    NavbarComponent,
    ToastyModule,
    ConfirmDialogModule

  ],
  providers: [
    PessoaService,
    CategoriaService,
    PerfilService,
    UsuarioService,
    TipoExameService,
    DashboardService,
    RelatoriosService,
    FuncionarioService,
    PacienteService,
    PermissaoService,
    ProntuarioService,
    SolicitacaoService,
    MedicoService,
    MedicacaoService,
    ExameService,
    AgendaService,
    ReceitaService,
    ErrorHandlerService,
    AuthService,

    ConfirmationService,
    JwtHelper,
    Title,
    { provide: LOCALE_ID, useValue: 'pt' }
  ]
})
export class CoreModule { }
