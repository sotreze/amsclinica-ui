import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';

import { AuthService } from 'app/seguranca/auth.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ReceitaFiltro, ReceitaService } from './../receita.service';

@Component({
  selector: 'app-receita-pesquisa',
  templateUrl: './receita-pesquisa.component.html',
  styleUrls: ['./receita-pesquisa.component.css']
})
export class ReceitaPesquisaComponent implements OnInit  {

  totalRegistros = 0;
  filtro = new ReceitaFiltro();
  receitas = [];
  @ViewChild('tabela') grid;

  constructor(
    private receitaService: ReceitaService,
    private errorHandler: ErrorHandlerService,
    public auth: AuthService,
    private confirmation: ConfirmationService,
    private toasty: ToastyService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de receitas');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.receitaService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.receitas = resultado.receitas;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(receita: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(receita);
      }
    });
  }

  excluir(receita: any) {
    this.receitaService.excluir(receita.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }
        this.toasty.success('Receita excluída com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  alternarStatus(receita: any): void {
    const novoStatus = !receita.ativo;

    this.receitaService.mudarStatus(receita.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativada' : 'desativada';

        receita.ativo = novoStatus;
        this.toasty.success(`Receita ${acao} com sucesso!`);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}

