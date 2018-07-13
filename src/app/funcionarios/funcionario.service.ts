import { URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

import { environment } from './../../environments/environment';
import { Funcionario } from './../core/model';

export class FuncionarioFiltro {
  nome: string;
  setor: string;
  dataAdmissaoDe: Date;
  pagina = 0;
  itensPorPagina = 10;
}

@Injectable()
export class FuncionarioService {

  funcionariosUrl: string;

  constructor(private http: AuthHttp) {
    this.funcionariosUrl = `${environment.apiUrl}/funcionarios`;
  }

  pesquisar(filtro: FuncionarioFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    if (filtro.setor) {
      params.set('setor', filtro.setor);
    }

    if (filtro.dataAdmissaoDe) {
      params.set('dataAdmissaoDe',
        moment(filtro.dataAdmissaoDe).format('YYYY-MM-DD'));
    }

    /*return this.http.get(`${this.funcionariosUrl}?resumo`,
        { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const funcionarios = responseJson.content;

        const resultado = {
          funcionarios,
          total: responseJson.totalElements
        };

        return resultado;
      });*/

    return this.http.get(`${this.funcionariosUrl}`, { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const funcionarios = responseJson.content;

        const resultado = {
          funcionarios,
          total: responseJson.totalElements
        };

        return resultado;
      });
  }

  listarTodos(): Promise<any> {
    return this.http.get(this.funcionariosUrl)
      .toPromise()
      .then(response => response.json().content);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.funcionariosUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(funcionario: Funcionario): Promise<Funcionario> {
    return this.http.post(this.funcionariosUrl, JSON.stringify(funcionario))
      .toPromise()
      .then(response => response.json());
  }

  atualizar(funcionario: Funcionario): Promise<Funcionario> {
    return this.http.put(`${this.funcionariosUrl}/${funcionario.codigo}`,
        JSON.stringify(funcionario))
      .toPromise()
      .then(response => {
        const funcionarioAlterado = response.json() as Funcionario;

        this.converterStringsParaDatas([funcionarioAlterado]);

        return funcionarioAlterado;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Funcionario> {
    return this.http.get(`${this.funcionariosUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const funcionario = response.json() as Funcionario;

        this.converterStringsParaDatas([funcionario]);

        return funcionario;
      });
  }

  private converterStringsParaDatas(funcionarios: Funcionario[]) {
    for (const funcionario of funcionarios) {
      funcionario.dataAdmissao = moment(funcionario.dataAdmissao,
        'YYYY-MM-DD').toDate();
    }
  }

}
