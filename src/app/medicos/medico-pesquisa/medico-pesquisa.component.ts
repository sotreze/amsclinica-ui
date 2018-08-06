import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  images: any[];

  constructor(
    private medicoService: MedicoService,
    private errorHandler: ErrorHandlerService,
    private auth: AuthService,
    private confirmation: ConfirmationService,
    private toasty: ToastyService,
    private route: ActivatedRoute,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de médicos');

    this.images = [];
    this.images.push({source:'https://s3.amazonaws.com/server-ams-arquivos/70716dc2-3f52-460a-9ffb-c0e3dd01b7f4_1.jpg', 
    alt:'Dr. Pedro', 
    title:'Dr. Pedro - Ginecologista'});
    this.images.push({source:'https://s3.amazonaws.com/server-ams-arquivos/173704ed-b946-40d6-bb27-e08034b13f51_2.jpg', 
    alt:'Dra. Isabela', 
    title:'Dra. Isabela - Dermatologista'});
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
