import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';

import { AuthService } from 'app/seguranca/auth.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { PacienteFiltro, PacienteService } from './../paciente.service';

@Component({
  selector: 'app-paciente-pesquisa',
  templateUrl: './paciente-pesquisa.component.html',
  styleUrls: ['./paciente-pesquisa.component.css']
})
export class PacientePesquisaComponent implements OnInit  {

  totalRegistros = 0;
  filtro = new PacienteFiltro();
  pacientes = [];
  @ViewChild('tabela') grid;

  constructor(
    private pacienteService: PacienteService,
    private errorHandler: ErrorHandlerService,
    public auth: AuthService,
    private confirmation: ConfirmationService,
    private toasty: ToastyService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de pacientes');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pacienteService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.pacientes = resultado.pacientes;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(paciente: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(paciente);
      }
    });
  }

  excluir(paciente: any) {
    this.pacienteService.excluir(paciente.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.toasty.success('Paciente excluído com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}

