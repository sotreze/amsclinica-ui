import { URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

import { environment } from './../../environments/environment';
import { Usuario} from './../core/model';

export class UsuarioFiltro {
  primeiroNome: string;
  pagina = 0;
  itensPorPagina = 10;
}

@Injectable()
export class UsuarioService {

  usuariosUrl: string;

  constructor(private http: AuthHttp) {
    this.usuariosUrl = `${environment.apiUrl}/usuarios`;
  }

  pesquisar(filtro: UsuarioFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.primeiroNome) {
      params.set('primeiroNome', filtro.primeiroNome);
    }

    return this.http.get(`${this.usuariosUrl}`, { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const usuarios = responseJson.content;

        const resultado = {
          usuarios,
          total: responseJson.totalElements
        };

        return resultado;
      })
  }

  listarTodos(): Promise<any> {
    return this.http.get(this.usuariosUrl)
      .toPromise()
      .then(response => response.json().content);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.usuariosUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    return this.http.put(`${this.usuariosUrl}/${codigo}/ativo`, ativo)
      .toPromise()
      .then(() => null);
  }

  adicionar(usuario: Usuario): Promise<Usuario> {
    return this.http.post(this.usuariosUrl, JSON.stringify(usuario))
      .toPromise()
      .then(response => response.json());
  }

  atualizar(usuario: Usuario): Promise<Usuario> {
    return this.http.put(`${this.usuariosUrl}/${usuario.codigo}`,
        JSON.stringify(usuario))
      .toPromise()
      .then(response => response.json() as Usuario);
  }

  buscarPorCodigo(codigo: number): Promise<Usuario> {
    return this.http.get(`${this.usuariosUrl}/${codigo}`)
      .toPromise()
      .then(response => response.json() as Usuario);
  }

}
