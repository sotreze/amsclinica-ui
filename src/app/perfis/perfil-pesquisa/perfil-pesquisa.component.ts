import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';

import { AuthService } from 'app/seguranca/auth.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { PerfilFiltro, PerfilService } from './../perfil.service';

@Component({
  selector: 'app-perfil-pesquisa',
  templateUrl: './perfil-pesquisa.component.html',
  styleUrls: ['./perfil-pesquisa.component.css']
})
export class PerfilPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new PerfilFiltro();
  perfis = [];
  @ViewChild('tabela') grid;

  constructor(
    private perfilService: PerfilService,
    private errorHandler: ErrorHandlerService,
    private auth: AuthService,
    private confirmation: ConfirmationService,
    private toasty: ToastyService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de perfis');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.perfilService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.perfis = resultado.perfis;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(perfil: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(perfil);
      }
    });
  }

  excluir(perfil: any) {
    this.perfilService.excluir(perfil.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }
        this.toasty.success('Perfil excluído com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}

