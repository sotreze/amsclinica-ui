import { URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

import { environment } from './../../environments/environment';
import { Medico } from './../core/model';

export class MedicoFiltro {
  especializacao: string;
  nome: string;
  crm: string;
  pagina = 0;
  itensPorPagina = 10;
}

@Injectable()
export class MedicoService {

  medicosUrl: string;

  constructor(private http: AuthHttp) {
    this.medicosUrl = `${environment.apiUrl}/medicos`;
  }

  pesquisar(filtro: MedicoFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.especializacao) {
      params.set('especializacao', filtro.especializacao);
    }

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }


    /*return this.http.get(`${this.medicosUrl}?resumo`,
        { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const medicos = responseJson.content;

        const resultado = {
          medicos,
          total: responseJson.totalElements
        };

        return resultado;
      });*/

    return this.http.get(`${this.medicosUrl}`, { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const medicos = responseJson.content;

        const resultado = {
          medicos,
          total: responseJson.totalElements
        };

        return resultado;
      });
  }

  listarTodos(): Promise<any> {
    return this.http.get(this.medicosUrl)
      .toPromise()
      .then(response => response.json().content);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.medicosUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(medico: Medico): Promise<Medico> {
    return this.http.post(this.medicosUrl, JSON.stringify(medico))
      .toPromise()
      .then(response => response.json());
  }

  atualizar(medico: Medico): Promise<Medico> {
    return this.http.put(`${this.medicosUrl}/${medico.codigo}`,
        JSON.stringify(medico))
      .toPromise()
      .then(response => {
        const medicoAlterado = response.json() as Medico;

        return medicoAlterado;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Medico> {
    return this.http.get(`${this.medicosUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const medico = response.json() as Medico;

        return medico;
      });
  }

}
