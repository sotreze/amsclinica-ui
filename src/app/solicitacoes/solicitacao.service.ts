import { URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

import { environment } from './../../environments/environment';
import { Solicitacao } from './../core/model';

export class SolicitacaoFiltro {

  agenda: string;
  data: Date;
  paciente: string;
  pagina = 0;
  itensPorPagina = 10;
}

@Injectable()
export class SolicitacaoService {

  solicitacoesUrl: string;

  constructor(private http: AuthHttp) {
    this.solicitacoesUrl = `${environment.apiUrl}/solicitacoes`;
  }

  urlUploadAnexo(): string {
    return `${this.solicitacoesUrl}/anexo`;
  }

  pesquisar(filtro: SolicitacaoFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.paciente) {
      params.set('paciente', filtro.paciente);
    }

    if (filtro.agenda) {
      params.set('agenda', filtro.agenda);
    }

    if (filtro.data) {
      params.set('data',
        moment(filtro.data).format('YYYY-MM-DD'));
    }

    return this.http.get(`${this.solicitacoesUrl}`, { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const solicitacoes = responseJson.content;

        const resultado = {
          solicitacoes,
          total: responseJson.totalElements
        };

        return resultado;
      });
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.solicitacoesUrl)
      .toPromise()
      .then(response => response.json().content);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.solicitacoesUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(solicitacao: Solicitacao): Promise<Solicitacao> {
    return this.http.post(this.solicitacoesUrl, JSON.stringify(solicitacao))
      .toPromise()
      .then(response => response.json());
  }

  atualizar(solicitacao: Solicitacao): Promise<Solicitacao> {
    return this.http.put(`${this.solicitacoesUrl}/${solicitacao.codigo}`,
        JSON.stringify(solicitacao))
      .toPromise()
      .then(response => {
        const solicitacaoAlterada = response.json() as Solicitacao;

        this.converterStringsParaDatas([solicitacaoAlterada]);

        return solicitacaoAlterada;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Solicitacao> {
    return this.http.get(`${this.solicitacoesUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const solicitacao = response.json() as Solicitacao;

        this.converterStringsParaDatas([solicitacao]);

        return solicitacao;
      });
  }

  private converterStringsParaDatas(solicitacoes: Solicitacao[]) {
    for (const solicitacao of solicitacoes) {
      solicitacao.data = moment(solicitacao.data,
        'YYYY-MM-DD').toDate();
    }
  }
}
