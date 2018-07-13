import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { ProntuarioService } from './../prontuario.service';
import { Prontuario } from './../../core/model';
import { Pessoa } from './../../core/model';

@Component({
  selector: 'app-prontuario-cadastro',
  templateUrl: './prontuario-cadastro.component.html',
  styleUrls: ['./prontuario-cadastro.component.css']
})
export class ProntuarioCadastroComponent implements OnInit {

  pessoas = [];
  pessoa = new Pessoa();
  prontuario = new Prontuario();


  constructor(
    private prontuarioService: ProntuarioService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {

    const codigoProntuario = this.route.snapshot.params['codigo'];

    this.title.setTitle('Novo Prontuário');

    if (codigoProntuario) {
      this.carregarProntuario(codigoProntuario);
    }

  }

  get editando() {
    return Boolean(this.prontuario.codigo)
  }

  /* get classificando() {
    return Boolean(this.pessoa.classe)
  }*/

  carregarProntuario(codigo: number) {
    this.prontuarioService.buscarPorCodigo(codigo)
      .then(prontuario => {
        this.prontuario = prontuario;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarProntuario(form);
    } else {
      this.adicionarProntuario(form);
    }
  }

  adicionarProntuario(form: FormControl) {
    this.prontuarioService.adicionar(this.prontuario)
      .then(prontuarioAdicionado => {
        this.toasty.success('Prontuário adicionado com sucesso!');
        this.router.navigate(['/prontuarios', prontuarioAdicionado.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarProntuario(form: FormControl) {
    this.prontuarioService.atualizar(this.prontuario)
      .then(prontuario => {
        this.prontuario = prontuario;

        this.toasty.success('Prontuário alterado com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.prontuario = new Prontuario();
    }.bind(this), 1);

    this.router.navigate(['/prontuarios/novo']);
  }

  atualizarTituloEdicao() {
    // this.title.setTitle(`Edição de funcionários: ${this.pessoa.nome}`);
    this.title.setTitle(`Edição de prontuarios: ${this.pessoa.nome}`);
  }

}
