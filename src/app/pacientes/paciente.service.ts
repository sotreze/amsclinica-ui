import { URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

import { environment } from './../../environments/environment';
import { Paciente } from './../core/model';

export class PacienteFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 10;
}

@Injectable()
export class PacienteService {

  pacientesUrl: string;
  // prontuariosUrl: string;

  constructor(private http: AuthHttp) {
    this.pacientesUrl = `${environment.apiUrl}/pacientes`;
  }

  pesquisar(filtro: PacienteFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      // ToDo
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pacientesUrl}`, { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const pacientes = responseJson.content;

        const resultado = {
          pacientes,
          total: responseJson.totalElements
        };

        return resultado;
      })

  }

  listarTodos(): Promise<any> {
    return this.http.get(this.pacientesUrl)
      .toPromise()
      .then(response => response.json().content);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.pacientesUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(paciente: Paciente): Promise<Paciente> {
    return this.http.post(this.pacientesUrl, JSON.stringify(paciente))
      .toPromise()
      .then(response => response.json());
  }

  atualizar(paciente: Paciente): Promise<Paciente> {
    return this.http.put(`${this.pacientesUrl}/${paciente.codigo}`,
        JSON.stringify(paciente))
      .toPromise()
      .then(response => {
        const pacienteAlterado = response.json() as Paciente;

        return pacienteAlterado;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Paciente> {
    return this.http.get(`${this.pacientesUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const paciente = response.json() as Paciente;

        return paciente;
      });
  }

}
