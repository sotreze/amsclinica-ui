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
    public auth: AuthService,
    private confirmation: ConfirmationService,
    private toasty: ToastyService,
    private route: ActivatedRoute,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de médicos');

    this.images = [];
    this.images.push({source:'https://s3.amazonaws.com/server-ams-arquivos/70716dc2-3f52-460a-9ffb-c0e3dd01b7f4_1.jpg', 
    alt:'Dr. Pedro Santos', 
    title:'Ginecologista - Doutorado em Obstetrícia e Ginecologia'});
    this.images.push({source:'https://s3.amazonaws.com/server-ams-arquivos/173704ed-b946-40d6-bb27-e08034b13f51_2.jpg', 
    alt:'Dra. Isabela Victorino', 
    title:'Infectologista - UNF'});
    this.images.push({source:'https://s3.amazonaws.com/server-ams-arquivos/6493bc3e-ad02-4e95-a910-8c7c62efb170_3.jpg',
    alt:'Dra. Sandra Gonçalves', 
    title:'Pediatra - especialista em pneumologia'});
    this.images.push({source:'https://s3.amazonaws.com/server-ams-arquivos/16be792c-c5d3-4ebe-af36-81d574fe6847_4.jpg',
    alt:'Dra. Andréia Pires', 
    title:'Urologista - Faculdade de medicina - USP'});
    this.images.push({source:'https://s3.amazonaws.com/server-ams-arquivos/29f58699-2351-4c1b-8b18-50f6a1919350_5.jpg',
    alt:'Dr. Sandro Dantas', 
    title:'Clínica Geral'});
    this.images.push({source:'https://s3.amazonaws.com/server-ams-arquivos/6122c574-3b96-4624-b139-6641ca5d3632_6.jpg',
    alt:'Dra. Cláudia Loureiro Alves', 
    title:'Cirurgiã Plástica '});
    this.images.push({source:'https://s3.amazonaws.com/server-ams-arquivos/f9941d79-9d52-41da-9655-c840752d69d1_7.jpg',
    alt:'Dr. Paulo Lima', 
    title:'Ortopedia e Traumatologia'});
    this.images.push({source:'https://s3.amazonaws.com/server-ams-arquivos/58cd7382-2b23-4727-819f-8b1b9f4a7a44_8.jpg',
    alt:'Dr. Antônio Brito Alves', 
    title:'Geriatra '});
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

  alternarStatus(medico: any): void {
    const novoStatus = !medico.ativo;

    this.medicoService.mudarStatus(medico.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativado' : 'desativado';

        medico.ativo = novoStatus;
        this.toasty.success(`Médico ${acao} com sucesso!`);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
