import { URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';


import { environment } from './../../environments/environment';
import { Lancamento } from './../core/model';

export class LancamentoFiltro {
  descricao: string;
  dataConsultaInicio: Date;
  dataConsultaFim: Date;
  pagina = 0;
  itensPorPagina = 10;
}

@Injectable()
export class LancamentoService {

  lancamentosUrl: string;

  constructor(private http: AuthHttp) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  urlUploadAnexo(): string {
    return `${this.lancamentosUrl}/anexo`;
  }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }

    if (filtro.dataConsultaInicio) {
      params.set('dataConsultaDe',
        moment(filtro.dataConsultaInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataConsultaFim) {
      params.set('dataConsultaAte',
        moment(filtro.dataConsultaFim).format('YYYY-MM-DD'));
    }

    /*return this.http.get(`${this.lancamentosUrl}?resumo`,
        { search: params }) */
    return this.http.get(`${this.lancamentosUrl}`, { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const lancamentos = responseJson.content;

        const resultado = {
          lancamentos,
          total: responseJson.totalElements
        };

        return resultado;
      });
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.lancamentosUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.post(this.lancamentosUrl,
        JSON.stringify(lancamento))
      .toPromise()
      .then(response => response.json());
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.put(`${this.lancamentosUrl}/${lancamento.codigo}`,
        JSON.stringify(lancamento))
      .toPromise()
      .then(response => {
        const lancamentoAlterado = response.json() as Lancamento;

        this.converterStringsParaDatas([lancamentoAlterado]);

        return lancamentoAlterado;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {
    return this.http.get(`${this.lancamentosUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const lancamento = response.json() as Lancamento;

        this.converterStringsParaDatas([lancamento]);

        return lancamento;
      });
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataConsulta = moment(lancamento.dataConsulta,
        'YYYY-MM-DD').toDate();

      if (lancamento.dataExame) {
        lancamento.dataExame = moment(lancamento.dataExame,
          'YYYY-MM-DD').toDate();
      }

      /*if (lancamento.dataLimite) {
        lancamento.dataLimite = moment(lancamento.dataLimite,
          'YYYY-MM-DD').toDate();
      }*/
    }
  }

}
