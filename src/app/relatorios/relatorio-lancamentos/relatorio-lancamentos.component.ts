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

  constructor(private relatoriosService: RelatoriosService) { }

  ngOnInit() {
    this.calendarPtbr();
  }


  gerar() {
    this.relatoriosService.relatorioLancamentosPorPessoa(this.periodoInicio, this.periodoFim)
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
    monthNamesShort: [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez' ]
    }
  };
}
