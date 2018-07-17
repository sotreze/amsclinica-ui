import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

import { environment } from './../../environments/environment';

@Injectable()
export class TipoExameService {

  tiposExamesUrl: string;

  constructor(private http: AuthHttp) {
    this.tiposExamesUrl = `${environment.apiUrl}/tiposexames`;
   }

   listarTodos(): Promise<any> {
    return this.http.get(this.tiposExamesUrl)
      .toPromise()
      .then(response => response.json());
  }

}















