import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';

import { AuthService } from 'app/seguranca/auth.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { FuncionarioFiltro, FuncionarioService } from './../funcionario.service';

@Component({
  selector: 'app-funcionario-pesquisa',
  templateUrl: './funcionario-pesquisa.component.html',
  styleUrls: ['./funcionario-pesquisa.component.css']
})
export class FuncionarioPesquisaComponent implements OnInit  {

  totalRegistros = 0;
  filtro = new FuncionarioFiltro();
  funcionarios = [];
  @ViewChild('tabela') grid;

  constructor(
    private funcionarioService: FuncionarioService,
    private errorHandler: ErrorHandlerService,
    private auth: AuthService,
    private confirmation: ConfirmationService,
    private toasty: ToastyService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de funcionários');
  }

  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;

    this.funcionarioService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.funcionarios = resultado.funcionarios;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(funcionario: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(funcionario);
      }
    });
  }

  excluir(funcionario: any) {
    this.funcionarioService.excluir(funcionario.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.toasty.success('Funcionário excluído com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  /*alternarStatus(funcionario: any): void {
    const novoStatus = !funcionario.ativo;

    this.funcionarioService.mudarStatus(funcionario.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativada' : 'desativada';

        funcionario.ativo = novoStatus;
        this.toasty.success(`Funcionário ${acao} com sucesso!`);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }*/

}
