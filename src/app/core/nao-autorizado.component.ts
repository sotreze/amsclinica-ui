import { Component, OnInit } from '@angular/core';

@Component({
  template: `
  <div class="container" style="max-width: 400px; margin: 05% auto">
  <h1 class="text-center">Acesso não autorizado!</h1>


    <div class="jumbotron">
      <img src="assets/img/negado.png" />
      <p>
        Contato o administrador do sistema para mais informações ou a área de Suporte Técnico.
      </p>
    </div>


  </div>
  `,
  styles: [
    `p,h1, div {
      text-align: center;
    }
    `
  ]
})
export class NaoAutorizadoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
