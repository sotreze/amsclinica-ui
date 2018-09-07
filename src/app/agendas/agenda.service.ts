import { URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

import { environment } from './../../environments/environment';
import { Agenda } from './../core/model';

export class AgendaFiltro {
  paciente: string;
  medico: string;
  email:string;
  dataAgendada: Date;
  horaAgendada: string;
  pagina = 0;
  itensPorPagina = 3;
}

@Injectable()
export class AgendaService {

  agendasUrl: string;

  constructor(private http: AuthHttp) {
    this.agendasUrl = `${environment.apiUrl}/agendas`;
  }

  pesquisar(filtro: AgendaFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.email) {
      params.set('email', filtro.email);
    }

    if (filtro.paciente) {
      params.set('paciente', filtro.paciente);
    }

    if (filtro.medico) {
      params.set('medico', filtro.medico);
    }

    if (filtro.dataAgendada) {
      params.set('data',
        moment(filtro.dataAgendada).format('YYYY-MM-DD'));
    }

    if (filtro.horaAgendada) {
      params.set('hora', filtro.horaAgendada);
    }

    return this.http.get(`${this.agendasUrl}`, { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const agendas = responseJson.content;

        const resultado = {
          agendas,
          total: responseJson.totalElements
        };

        return resultado;
      });
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.agendasUrl)
      .toPromise()
      .then(response => response.json().content);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.agendasUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    return this.http.put(`${this.agendasUrl}/${codigo}/ativo`, ativo)
      .toPromise()
      .then(() => null);
  }

  adicionar(agenda: Agenda): Promise<Agenda> {
    return this.http.post(this.agendasUrl, JSON.stringify(agenda))
      .toPromise()
      .then(response => response.json());
  }

  atualizar(agenda: Agenda): Promise<Agenda> {
    return this.http.put(`${this.agendasUrl}/${agenda.codigo}`,
        JSON.stringify(agenda))
      .toPromise()
      .then(response => {
        const agendaAlterada = response.json() as Agenda;

        this.converterStringsParaDatas([agendaAlterada]);

        return agendaAlterada;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Agenda> {
    return this.http.get(`${this.agendasUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const agenda = response.json() as Agenda;

        this.converterStringsParaDatas([agenda]);

        return agenda;
      });
  }

  private converterStringsParaDatas(agendas: Agenda[]) {
    for (const agenda of agendas) {
      agenda.data = moment(agenda.data,
        'YYYY-MM-DD').toDate();
    }
  } 
}
