import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { ProntuarioService } from './../prontuario.service';
import { PacienteService } from './../../pacientes/paciente.service';
import { MedicoService } from './../../medicos/medico.service';
import { Prontuario } from './../../core/model';


@Component({
  selector: 'app-prontuario-cadastro',
  templateUrl: './prontuario-cadastro.component.html',
  styleUrls: ['./prontuario-cadastro.component.css']
})
export class ProntuarioCadastroComponent implements OnInit {


  pacientes = [];
  medicos = [];
  formulario: FormGroup;
  pt_BR: any;
  uploadEmAndamento = false;

  constructor(
    private pacienteService: PacienteService,
    private medicoService: MedicoService,
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

    const codigoProntuario = this.route.snapshot.params['codigo'];

    this.title.setTitle('Novo prontuário');

    if (codigoProntuario) {
      this.carregarProntuario(codigoProntuario);
    }

    this.carregarPacientes();
    this.carregarMedicos();
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
      paciente: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nome: []
      }),
      medico: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nome: []
      }),
      relatorio: [null, [ this.validarObrigatoriedade]],
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

        this.router.navigate(['/prontuarios', prontuarioAdicionado.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarProntuario() {
    this.prontuarioService.atualizar(this.formulario.value)
      .then(prontuario => {

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

  carregarMedicos() {
    this.medicoService.listarTodos()
      .then(medicos => {
        this.medicos = medicos
          .map(m => ({ label: m.nome, value: m.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

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
}