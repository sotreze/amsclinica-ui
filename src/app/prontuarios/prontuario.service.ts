import { URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

import { environment } from './../../environments/environment';
import { Prontuario } from './../core/model';

export class ProntuarioFiltro {
  
  receita: string;
  relatorio: string;
  pagina = 0;
  itensPorPagina = 10;
}

@Injectable()
export class ProntuarioService {

  prontuariosUrl: string;

  constructor(private http: AuthHttp) {
    this.prontuariosUrl = `${environment.apiUrl}/prontuarios`;
  }

  urlUploadAnexo(): string {
    return `${this.prontuariosUrl}/anexo`;
  }

  pesquisar(filtro: ProntuarioFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    /*if (filtro.exame) {
      params.set('exame', filtro.exame);
    }*/

    if (filtro.receita) {
      params.set('receita', filtro.receita);
    }

    if (filtro.relatorio) {
      params.set('relatorio', filtro.relatorio);
    }

    return this.http.get(`${this.prontuariosUrl}`, { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const prontuarios = responseJson.content;

        const resultado = {
          prontuarios,
          total: responseJson.totalElements
        };

        return resultado;
      });
  }

  listarTodos(): Promise<any> {
    return this.http.get(this.prontuariosUrl)
      .toPromise()
      .then(response => response.json().content);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.prontuariosUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  /*mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    return this.http.put(`${this.prontuariosUrl}/${codigo}/ativo`, ativo)
      .toPromise()
      .then(() => null);
  }*/

  adicionar(prontuario: Prontuario): Promise<Prontuario> {
    return this.http.post(this.prontuariosUrl, JSON.stringify(prontuario))
      .toPromise()
      .then(response => response.json());
  }

  atualizar(prontuario: Prontuario): Promise<Prontuario> {
    return this.http.put(`${this.prontuariosUrl}/${prontuario.codigo}`,
        JSON.stringify(prontuario))
      .toPromise()
      .then(response => {
        const prontuarioAlterado = response.json() as Prontuario;

        return prontuarioAlterado;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Prontuario> {
    return this.http.get(`${this.prontuariosUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const prontuario = response.json() as Prontuario;

        return prontuario;
      });
  }
}
