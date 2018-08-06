import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';

import { AuthService } from 'app/seguranca/auth.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { SolicitacaoFiltro, SolicitacaoService } from './../solicitacao.service';

@Component({
  selector: 'app-solicitacao-pesquisa',
  templateUrl: './solicitacao-pesquisa.component.html',
  styleUrls: ['./solicitacao-pesquisa.component.css']
})
export class SolicitacaoPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new SolicitacaoFiltro();
  solicitacoes = [];
  @ViewChild('tabela') grid;

  constructor(
    private solicitacaoService: SolicitacaoService,
    private errorHandler: ErrorHandlerService,
    private auth: AuthService,
    private confirmation: ConfirmationService,
    private toasty: ToastyService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de solicitacões');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.solicitacaoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.solicitacoes = resultado.solicitacoes;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(solicitacao: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(solicitacao);
      }
    });
  }

  excluir(solicitacao: any) {
    this.solicitacaoService.excluir(solicitacao.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }
        this.toasty.success('Solicitação excluída com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
