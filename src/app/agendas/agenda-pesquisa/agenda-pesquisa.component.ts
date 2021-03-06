import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { Dropdown } from 'primeng/components/dropdown/dropdown';
import { SelectItem } from 'primeng/api';

import { ToastyService } from 'ng2-toasty';

import { AuthService } from 'app/seguranca/auth.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { AgendaFiltro, AgendaService } from './../agenda.service';

@Component({
  selector: 'app-agenda-pesquisa',
  templateUrl: './agenda-pesquisa.component.html',
  styleUrls: ['./agenda-pesquisa.component.css']
})
export class AgendaPesquisaComponent implements OnInit  {

  pt_BR: any;
  dataLimite = new Date();
  diaSeguinte = new Date();
  today = new Date();
  selectedHora: string;
  relogio = 'fa fa-fw fa-clock-o';

  horas: any[];

  timeValue: string;

  totalRegistros = 0;
  filtro = new AgendaFiltro();
  agendas = [];

  imagens: any[];
 


  @ViewChild('tabela') grid;

  constructor(
    private agendaService: AgendaService,
    private errorHandler: ErrorHandlerService,
    private auth: AuthService,
    private confirmation: ConfirmationService,
    private toasty: ToastyService,
    private title: Title
  ) { }

  ngOnInit() {

    this.calendarPtbr();

    this.dataLimite.setDate(this.dataLimite.getDate() + 90);  

    this.diaSeguinte.setDate(this.diaSeguinte.getDate() + 1);

    this.title.setTitle('Pesquisa de agendas');

    this.onSelect(this.timeValue);
     
 
      this.horas = [];
      this.horas.push({label: 'Selecione', value: 'Selecione'});
      this.horas.push({label: '08:00', value: '08:00'});
      this.horas.push({label: '08:20', value: '08:20'});
      this.horas.push({label: '08:40', value: '08:40'});
      this.horas.push({label: '09:00', value: '09:00'});
      this.horas.push({label: '09:20', value: '09:20'});
      this.horas.push({label: '09:40', value: '09:40'});
      this.horas.push({label: '10:00', value: '10:00'});
      this.horas.push({label: '10:20', value: '10:20'});
      this.horas.push({label: '10:40', value: '10:40'});
      this.horas.push({label: '11:00', value: '11:00'});
      this.horas.push({label: '11:20', value: '11:20'});
      this.horas.push({label: '11:40', value: '11:40'});
      this.horas.push({label: '12:00', value: '12:00'});
      this.horas.push({label: '13:00', value: '13:00'});
      this.horas.push({label: '13:20', value: '13:20'});
      this.horas.push({label: '13:40', value: '13:40'});
      this.horas.push({label: '14:00', value: '14:00'});
      this.horas.push({label: '14:20', value: '14:20'});
      this.horas.push({label: '14:40', value: '14:40'});
      this.horas.push({label: '15:00', value: '15:00'});
      this.horas.push({label: '15:20', value: '15:20'});
      this.horas.push({label: '15:40', value: '15:40'});
      this.horas.push({label: '16:00', value: '16:00'});
      this.horas.push({label: '16:20', value: '16:20'});
      this.horas.push({label: '16:40', value: '16:40'});
      this.horas.push({label: '17:00', value: '17:00'});
      this.horas.push({label: '17:20', value: '17:20'});
      this.horas.push({label: '17:40', value: '17:40'});
      this.horas.push({label: '18:00', value: '18:00'});

  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.agendaService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.agendas = resultado.agendas;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(agenda: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(agenda);
      }
    });
  }

  excluir(agenda: any) {
    this.agendaService.excluir(agenda.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }
        this.toasty.success('Agenda excluída com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  alternarStatus(agenda: any): void {
    const novoStatus = !agenda.ativo;

    this.agendaService.mudarStatus(agenda.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativado' : 'desativado';

        agenda.ativo = novoStatus;
        this.toasty.success(`Agenda ${acao} com sucesso!`);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  calendarPtbr() {

    this.pt_BR = {
    firstDayOfWeek: 0,
    dayNames: [ 'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado' ],
    dayNamesShort: [ 'dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb' ],
    dayNamesMin: [  'D', 'S', 'T', 'Q', 'Q', 'S', 'S' ],
    monthNames: [ 'Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro' ],
    monthNamesShort: [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez' ],
    today: 'Hoje',
    clear: 'Limpar'
    }
  }

  /*horarios() {
    this.horas = [
        {label: 'Selecione', value: 'Selecione'},
        {label: '08:00', value: '08:00'},
        {label: '08:30', value: '08:30'},
        {label: '09:00', value: '09:00'},
        {label: '09:30', value: '09:30'},
        {label: '10:00', value: '10:00'},
        {label: '10:30', value: '10:30'},
        {label: '11:00', value: '11:00'},
        {label: '11:30', value: '11:30'},
        {label: '12:00', value: '12:00'},
        {label: '13:00', value: '13:00'},
        {label: '13:30', value: '13:30'},
        {label: '14:00', value: '14:00'},
        {label: '14:30', value: '14:30'},
        {label: '15:00', value: '15:00'},
        {label: '15:30', value: '15:30'},
        {label: '16:00', value: '16:00'},
        {label: '16:30', value: '16:30'},
        {label: '17:00', value: '17:00'},
        {label: '17:30', value: '17:30'},
        {label: '18:00', value: '18:00'},
    ];
    
  }*/


  clearFilter(dropdown: Dropdown) {
    dropdown.resetFilter();
  }

  onClick(disabled: boolean) {
    if(disabled) {
        event.stopPropagation();
    }
  }

  //TODO
  /*newTeste(isDisable: boolean ) {
    let hoje = new Date();
    if(hoje) {
      isDisable;
    }
  }*/

  onSelect($event) {
    let hour = new Date($event).getHours();
    let min = new Date($event).getMinutes();
    this.timeValue = `${hour}:${min}`;
  }

}


