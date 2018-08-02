/*import { Title } from '@angular/platform-browser';
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
  uploadEmAndamento = false;


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

}*/



import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { ProntuarioService } from './../prontuario.service';
import { PacienteService } from './../../pacientes/paciente.service';
import { Prontuario } from './../../core/model';
import { Pessoa } from './../../core/model';

@Component({
  selector: 'app-prontuario-cadastro',
  templateUrl: './prontuario-cadastro.component.html',
  styleUrls: ['./prontuario-cadastro.component.css']
})
export class ProntuarioCadastroComponent implements OnInit {


  //tiposexames = [];
  pacientes = [];
  //prontuarios = [];
  prontuario = new Prontuario();
  formulario: FormGroup;
  pt_BR: any;
  uploadEmAndamento = false;

  constructor(
    //private tipoExameService: TipoExameService,
    private pacienteService: PacienteService,
    private prontuarioService: ProntuarioService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.configurarFormulario();

    //this.calendarPtbr();

    const codigoProntuario = this.route.snapshot.params['codigo'];

    this.title.setTitle('Novo prontuário');

    if (codigoProntuario) {
      this.carregarProntuario(codigoProntuario);
    }

    //this.carregarExames();
    this.carregarPacientes();
    //this.carregarProntuarios();
  }

  antesUploadAnexo(event) {
    event.xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));

    this.uploadEmAndamento = true;
  }

  aoTerminarUploadAnexo(event) {
    const anexo = JSON.parse(event.xhr.response);

    this.formulario.patchValue({
      anexo: anexo.nome,
      urlAnexo: anexo.url
    });

    this.uploadEmAndamento = false;
  }

  erroUpload(event) {
    this.toasty.error('Erro ao tentar enviar anexo!');

    this.uploadEmAndamento = false;
  }

  removerAnexo() {
    this.formulario.patchValue({
      anexo: null,
      urlAnexo: null
    });
  }

  get nomeAnexo() {
    const nome = this.formulario.get('anexo').value;

    if (nome) {
      return nome.substring(nome.indexOf('_') + 1, nome.length);
    }

    return '';
  }

  get urlUploadAnexo() {
    return this.prontuarioService.urlUploadAnexo();
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [],
      receita: [],
      paciente: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nome: []
      }),
      /*prontuario: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        relatorio: []
      }),*/
      relatorio: [null, [ this.validarObrigatoriedade, this.validarTamanhoMinimo(5) ]],
      anexo: [],
      urlAnexo: []
    });
  }

  validarObrigatoriedade(input: FormControl) {
    return (input.value ? null : { obrigatoriedade: true });
  }

  validarTamanhoMinimo(valor: number) {
    return (input: FormControl) => {
      return (!input.value || input.value.length >= valor) ? null : { tamanhoMinimo: { tamanho: valor } };
    };
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  carregarProntuario(codigo: number) {
    this.prontuarioService.buscarPorCodigo(codigo)
      .then(prontuario => {
       // this.lancamento = lancamento;
       // this.formulario.setValue(lancamento);
       this.formulario.patchValue(prontuario);
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar() {
    if (this.editando) {
      this.atualizarProntuario();
    } else {
      this.adicionarProntuario();
    }
  }

  adicionarProntuario() {
    this.prontuarioService.adicionar(this.formulario.value)
      .then(prontuarioAdicionado => {
        this.toasty.success('Prontuário adicionado com sucesso!');

        // form.reset();
        // this.lancamento = new Lancamento();
        this.router.navigate(['/prontuarios', prontuarioAdicionado.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarProntuario() {
    this.prontuarioService.atualizar(this.formulario.value)
      .then(prontuario => {
        // this.lancamento = lancamento;
        // this.formulario.setValue(lancamento);
        this.formulario.patchValue(prontuario);

        this.toasty.success('Prontuario alterado com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPacientes() {
    this.pacienteService.listarTodos()
      .then(pacientes => {
        this.pacientes = pacientes
          .map(p => ({ label: p.nome, value: p.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  /*carregarProntuarios() {
    this.prontuarioService.listarTodos()
      .then(prontuarios => {
        this.prontuarios = prontuarios
          .map(p => ({ label: p.nome, value: p.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }*/

  novo() {
    this.formulario.reset();

    setTimeout(function() {
      this.prontuario = new Prontuario();
    }.bind(this), 1);

    this.router.navigate(['/prontuarios/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de prontuário: ${this.formulario.get('codigo').value}`);
  }

  /*calendarPtbr() {

    this.pt_BR = {
    firstDayOfWeek: 0,
    dayNames: [ 'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado' ],
    dayNamesShort: [ 'dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb' ],
    dayNamesMin: [  'D', 'S', 'T', 'Q', 'Q', 'S', 'S' ],
    monthNames: [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto','Setembro','Outubro','Novembro','Dezembro' ],
    monthNamesShort: [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez' ]
    }
  };*/
}