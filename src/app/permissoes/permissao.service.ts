import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

import { environment } from './../../environments/environment';

@Injectable()
export class PermissaoService {

  permissoesUrl: string;

  constructor(private http: AuthHttp) {
    this.permissoesUrl = `${environment.apiUrl}/permissoes`;
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.permissoesUrl)
      .toPromise()
      .then(response => response.json());
  }

}

