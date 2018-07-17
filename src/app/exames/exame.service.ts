import { URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

import { environment } from './../../environments/environment';
import { Exame, Paciente } from './../core/model';

export class ExameFiltro {
  paciente: string;
  pagina = 0;
  itensPorPagina = 10;
}

@Injectable()
export class ExameService {

  examesUrl: string;

  constructor(private http: AuthHttp) {
    this.examesUrl = `${environment.apiUrl}/exames`;
  }

  pesquisar(filtro: ExameFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.paciente) {
      params.set('paciente', filtro.paciente);
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

    return this.http.get(`${this.examesUrl}`, { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const exames = responseJson.content;

        const resultado = {
          exames,
          total: responseJson.totalElements
        };

        return resultado;
      });
  }

  listarTodos(): Promise<any> {
    return this.http.get(this.examesUrl)
      .toPromise()
      .then(response => response.json().content);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.examesUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    return this.http.put(`${this.examesUrl}/${codigo}/ativo`, ativo)
      .toPromise()
      .then(() => null);
  }

  adicionar(exame: Exame): Promise<Exame> {
    return this.http.post(this.examesUrl, JSON.stringify(exame))
      .toPromise()
      .then(response => response.json());
  }

  atualizar(exame: Exame): Promise<Exame> {
    return this.http.put(`${this.examesUrl}/${exame.codigo}`,
        JSON.stringify(exame))
      .toPromise()
      .then(response => response.json() as Exame);
  }

  buscarPorCodigo(codigo: number): Promise<Exame> {
    return this.http.get(`${this.examesUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const exame = response.json() as Exame;

        return exame;
      });
  }
}

