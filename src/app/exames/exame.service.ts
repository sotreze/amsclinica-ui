import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

import { environment } from './../../environments/environment';

@Injectable()
export class ExameService {

  examesUrl: string;

  constructor(private http: AuthHttp) {
    this.examesUrl = `${environment.apiUrl}/exames`;
  }

  listarTodos(): Promise<any> {
    return this.http.get(this.examesUrl)
      .toPromise()
      .then(response => response.json());
  }

}
