import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { FuncionarioService } from './../funcionario.service';
import { PessoaService } from './../../pessoas/pessoa.service';
import { Funcionario } from './../../core/model';
import { Pessoa } from './../../core/model';

@Component({
  selector: 'app-funcionario-cadastro',
  templateUrl: './funcionario-cadastro.component.html',
  styleUrls: ['./funcionario-cadastro.component.css']
})
export class FuncionarioCadastroComponent implements OnInit {

  pessoas = [];
  funcionario = new Funcionario();
  pessoa = new Pessoa();
  pt_BR: any;

  // selectedValue: string = 'FISICA';

  constructor(
    private funcionarioService: FuncionarioService,
    private pessoaService: PessoaService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {

    this.calendarPtbr();
    const codigoFuncionario = this.route.snapshot.params['codigo'];

    this.title.setTitle('Novo Funcionário');

    if (codigoFuncionario) {
      this.carregarFuncionario(codigoFuncionario);
    }

    this.carregarPessoas();

  }

  get editando() {
    return Boolean(this.funcionario.codigo)
  }

  /* get classificando() {
    return Boolean(this.pessoa.classe)
  }*/

  carregarFuncionario(codigo: number) {
    this.funcionarioService.buscarPorCodigo(codigo)
      .then(funcionario => {
        this.funcionario = funcionario;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarFuncionario(form);
    } else {
      this.adicionarFuncionario(form);
    }
  }

  adicionarFuncionario(form: FormControl) {
    this.funcionarioService.adicionar(this.funcionario)
      .then(funcionarioAdicionado => {
        this.toasty.success('Funcionário adicionado com sucesso!');
        this.router.navigate(['/funcionarios', funcionarioAdicionado.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarFuncionario(form: FormControl) {
    this.funcionarioService.atualizar(this.funcionario)
      .then(funcionario => {
        this.funcionario = funcionario;

        this.toasty.success('Funcionário alterado com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas() {
    this.pessoaService.listarTodas()
      .then(pessoas => {
        this.pessoas = pessoas
          .map(p => ({ label: p.cpf, value: p.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.funcionario = new Funcionario();
    }.bind(this), 1);

    this.router.navigate(['/funcionarios/novo']);
  }

  atualizarTituloEdicao() {
    // this.title.setTitle(`Edição de funcionários: ${this.pessoa.nome}`);
    this.title.setTitle(`Edição de funcionários: ${this.pessoa.nome}`);
  }

  calendarPtbr() {

    this.pt_BR = {
    firstDayOfWeek: 0,
    dayNames: [ 'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado' ],
    dayNamesShort: [ 'dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb' ],
    dayNamesMin: [  'D', 'S', 'T', 'Q', 'Q', 'S', 'S' ],
    monthNames: [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto','Setembro','Outubro','Novembro','Dezembro' ],
    monthNamesShort: [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez' ]
    }
  };

}
