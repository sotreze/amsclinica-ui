import { Dropdown } from 'primeng/components/dropdown/dropdown';
import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';

import { SelectItem } from 'primeng/api';

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
  today = new Date();
  horas: SelectItem[];
  selectedHora: string;

  totalRegistros = 0;
  filtro = new AgendaFiltro();
  agendas = [];
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

    this.horarios();

    this.dataLimite.setDate(this.dataLimite.getDate() + 90);  

    this.title.setTitle('Pesquisa de agendas');
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

  horarios() {
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
    
  }

  clearFilter(dropdown: Dropdown) {
    dropdown.resetFilter();
}

}


