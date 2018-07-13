import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-nao-encontrada',
  template: `
  <div class="container" style="max-width: 400px; margin: 05% auto">
  <h1 class="text-center">Página não encontrada</h1>


    <div class="jumbotron">
      <img src="assets/img/404.png" /><h1>Precisa de ajuda?</h1>
      <p>
        Acesse o <a [routerLink]="['/lancamentos']">Link</a>.
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
export class PaginaNaoEncontradaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
