import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';

import { AuthService } from 'app/seguranca/auth.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ProntuarioFiltro, ProntuarioService } from './../prontuario.service';

@Component({
  selector: 'app-prontuario-pesquisa',
  templateUrl: './prontuario-pesquisa.component.html',
  styleUrls: ['./prontuario-pesquisa.component.css']
})
export class ProntuarioPesquisaComponent implements OnInit  {

  totalRegistros = 0;
  filtro = new ProntuarioFiltro();
  prontuarios = [];
  @ViewChild('tabela') grid;

  constructor(
    private prontuarioService: ProntuarioService,
    private errorHandler: ErrorHandlerService,
    public auth: AuthService,
    private confirmation: ConfirmationService,
    private toasty: ToastyService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de prontuários');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.prontuarioService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.prontuarios = resultado.prontuarios;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(prontuario: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(prontuario);
      }
    });
  }

  excluir(prontuario: any) {
    this.prontuarioService.excluir(prontuario.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }
        this.toasty.success('Anotação excluída com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  /*alternarStatus(prontuario: any): void {
    const novoStatus = !prontuario.ativo;

    this.prontuarioService.mudarStatus(prontuario.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativada' : 'desativada';

        prontuario.ativo = novoStatus;
        this.toasty.success(`Prontuario ${acao} com sucesso!`);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }*/

}
