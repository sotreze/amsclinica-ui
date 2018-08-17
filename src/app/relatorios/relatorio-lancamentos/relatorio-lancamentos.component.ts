import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

import { RelatoriosService } from './../relatorios.service';

@Component({
  selector: 'app-relatorio-lancamentos',
  templateUrl: './relatorio-lancamentos.component.html',
  styleUrls: ['./relatorio-lancamentos.component.css']
})
export class RelatorioLancamentosComponent implements OnInit {

  pt_BR: any;
  periodoInicio: Date;
  periodoFim: Date;

  constructor(
    private title: Title,
    private relatoriosService: RelatoriosService) { }

  ngOnInit() {
    this.title.setTitle('Relatórios');
    this.calendarPtbr();
  }


  gerar() {
    this.relatoriosService.relatorioAgendasPorMedico(this.periodoInicio, this.periodoFim)
      .then(relatorio => {
        const url = window.URL.createObjectURL(relatorio);

        window.open(url);
      });
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
  };
}
