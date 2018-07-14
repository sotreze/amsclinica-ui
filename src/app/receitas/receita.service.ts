import { URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

import { environment } from './../../environments/environment';
import { Receita, Paciente } from './../core/model';

export class ReceitaFiltro {
  descricao: string;
  pagina = 0;
  itensPorPagina = 10;
}

@Injectable()
export class ReceitaService {

  receitasUrl: string;

  constructor(private http: AuthHttp) {
    this.receitasUrl = `${environment.apiUrl}/receitas`;
  }

  pesquisar(filtro: ReceitaFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }

    /*return this.http.get(`${this.receitasUrl}?resumo`,
        { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const receitas = responseJson.content;

        const resultado = {
          receitas,
          total: responseJson.totalElements
        };

        return resultado;
      });*/

    return this.http.get(`${this.receitasUrl}`, { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const receitas = responseJson.content;

        const resultado = {
          receitas,
          total: responseJson.totalElements
        };

        return resultado;
      });
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.receitasUrl)
      .toPromise()
      .then(response => response.json().content);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.receitasUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    return this.http.put(`${this.receitasUrl}/${codigo}/ativo`, ativo)
      .toPromise()
      .then(() => null);
  }

  adicionar(receita: Receita): Promise<Receita> {
    return this.http.post(this.receitasUrl, JSON.stringify(receita))
      .toPromise()
      .then(response => response.json());
  }

  atualizar(receita: Receita): Promise<Receita> {
    return this.http.put(`${this.receitasUrl}/${receita.codigo}`,
        JSON.stringify(receita))
      .toPromise()
      .then(response => response.json() as Receita);
  }

  buscarPorCodigo(codigo: number): Promise<Receita> {
    return this.http.get(`${this.receitasUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const receita = response.json() as Receita;

        return receita;
      });
  }
}

