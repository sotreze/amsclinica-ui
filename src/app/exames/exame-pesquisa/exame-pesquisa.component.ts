import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';

import { AuthService } from 'app/seguranca/auth.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ExameFiltro, ExameService } from './../exame.service';

@Component({
  selector: 'app-exame-pesquisa',
  templateUrl: './exame-pesquisa.component.html',
  styleUrls: ['./exame-pesquisa.component.css']
})
export class ExamePesquisaComponent implements OnInit  {

  totalRegistros = 0;
  filtro = new ExameFiltro();
  exames = [];
  @ViewChild('tabela') grid;

  constructor(
    private exameService: ExameService,
    private errorHandler: ErrorHandlerService,
    public auth: AuthService,
    private confirmation: ConfirmationService,
    private toasty: ToastyService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de exames');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.exameService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.exames = resultado.exames;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(exame: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(exame);
      }
    });
  }

  excluir(exame: any) {
    this.exameService.excluir(exame.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }
        this.toasty.success('Exame excluído com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  alternarStatus(exame: any): void {
    const novoStatus = !exame.ativo;

    this.exameService.mudarStatus(exame.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativado' : 'desativado';

        exame.ativo = novoStatus;
        this.toasty.success(`Exame ${acao} com sucesso!`);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}

