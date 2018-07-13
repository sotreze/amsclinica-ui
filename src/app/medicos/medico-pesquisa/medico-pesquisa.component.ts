import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';

import { AuthService } from 'app/seguranca/auth.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { MedicoFiltro, MedicoService } from './../medico.service';

@Component({
  selector: 'app-medico-pesquisa',
  templateUrl: './medico-pesquisa.component.html',
  styleUrls: ['./medico-pesquisa.component.css']
})
export class MedicoPesquisaComponent implements OnInit  {

  totalRegistros = 0;
  filtro = new MedicoFiltro();
  medicos = [];
  @ViewChild('tabela') grid;

  constructor(
    private medicoService: MedicoService,
    private errorHandler: ErrorHandlerService,
    private auth: AuthService,
    private confirmation: ConfirmationService,
    private toasty: ToastyService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de médicos');
  }

  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;

    this.medicoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.medicos = resultado.medicos;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(medico: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(medico);
      }
    });
  }

  excluir(medico: any) {
    this.medicoService.excluir(medico.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.toasty.success('Médico excluído com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  /*alternarStatus(medico: any): void {
    const novoStatus = !medico.ativo;

    this.medicoService.mudarStatus(medico.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativada' : 'desativada';

        medico.ativo = novoStatus;
        this.toasty.success(`Funcionário ${acao} com sucesso!`);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }*/

}
