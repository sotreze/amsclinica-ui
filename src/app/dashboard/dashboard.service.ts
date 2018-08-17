import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';
import 'rxjs/operator/toPromise';
import * as moment from 'moment';

import { environment } from './../../environments/environment';

@Injectable()
export class DashboardService {

  examesUrl: string;
  solicitacoesUrl: string;

  constructor(private http: AuthHttp) {
    this.solicitacoesUrl = `${environment.apiUrl}/solicitacoes`;
    this.examesUrl = `${environment.apiUrl}/exames`;
  }

  examesPorTipo(): Promise<Array<any>> {
    return this.http.get(`${this.examesUrl}/estatisticas/por-exame`)
      .toPromise()
      .then(response => response.json());
  }

  /*solicitacoesPorTipo(): Promise<Array<any>> {
    return this.http.get(`${this.solicitacoesUrl}/estatisticas/por-tipo`)
      .toPromise()
      .then(response => response.json());
  }

  solicitacoesPorDia(): Promise<Array<any>> {
    return this.http.get(`${this.solicitacoesUrl}/estatisticas/por-dia`)
      .toPromise()
      .then(response => {
        const dados = response.json();
        this.converterStringsParaDatas(dados);

        return dados;
      });
  }

  private converterStringsParaDatas(dados: Array<any>) {
    for (const dado of dados) {
      dado.dia = moment(dado.dia, 'YYYY-MM-DD').toDate();
    }
  }*/
}
