import { URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

import { environment } from './../../environments/environment';
import { Perfil } from './../core/model';

export class PerfilFiltro {
  codigo: string;
  pagina = 0;
  itensPorPagina = 10;
}

@Injectable()
export class PerfilService {

  perfisUrl: string;

  constructor(private http: AuthHttp) {
    this.perfisUrl = `${environment.apiUrl}/perfis`;
  }

  pesquisar(filtro: PerfilFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.codigo) {
      params.set('codigo', filtro.codigo);
    }

    return this.http.get(`${this.perfisUrl}`, { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const perfis = responseJson.content;

        const resultado = {
          perfis,
          total: responseJson.totalElements
        };

        return resultado;
      })

  }

  listarTodos(): Promise<any> {
    return this.http.get(this.perfisUrl)
      .toPromise()
      .then(response => response.json().content);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.perfisUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(perfil: Perfil): Promise<Perfil> {
    return this.http.post(this.perfisUrl, JSON.stringify(perfil))
      .toPromise()
      .then(response => response.json());
  }

  atualizar(perfil: Perfil): Promise<Perfil> {
    return this.http.put(`${this.perfisUrl}/${perfil.codigo}`,
        JSON.stringify(perfil))
      .toPromise()
      .then(response => {
        const perfilAlterado = response.json() as Perfil;

        return perfilAlterado;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Perfil> {
    return this.http.get(`${this.perfisUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const perfil = response.json() as Perfil;

        return perfil;
      });
  }

}
