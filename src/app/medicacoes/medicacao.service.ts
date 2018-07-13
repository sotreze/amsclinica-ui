import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

import { environment } from './../../environments/environment';

@Injectable()
export class MedicacaoService {

  medicacoesUrl: string;

  constructor(private http: AuthHttp) {
    this.medicacoesUrl = `${environment.apiUrl}/medicacoes`;
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.medicacoesUrl)
      .toPromise()
      .then(response => response.json());
  }

}
