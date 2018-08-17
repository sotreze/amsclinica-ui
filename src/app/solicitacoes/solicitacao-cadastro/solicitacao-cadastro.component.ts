import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { SolicitacaoService } from './../solicitacao.service';
import { PacienteService } from './../../pacientes/paciente.service';
//import { AgendaService } from './../../agendas/agenda.service';
import { Solicitacao } from './../../core/model';


@Component({
  selector: 'app-solicitacao-cadastro',
  templateUrl: './solicitacao-cadastro.component.html',
  styleUrls: ['./solicitacao-cadastro.component.css']
})
export class SolicitacaoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Cancelamento', value: 'CANCELAMENTO' },
    { label: 'Solicitação', value: 'SOLICITACAO' },
  ];

  tipo='CANCELAMENTO';
  //agendas = []
  pacientes = [];
  formulario: FormGroup;
  pt_BR: any;
  uploadEmAndamento = false;
  today = new Date();

  constructor(
    //private agendaService: AgendaService,
    private pacienteService: PacienteService,
    private solicitacaoService: SolicitacaoService,
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

    const codigoSolicitacao = this.route.snapshot.params['codigo'];

    this.title.setTitle('Nova solicitação');

    if (codigoSolicitacao) {
      this.carregarSolicitacao(codigoSolicitacao);
    }

    //this.carregarAgendas();
    this.carregarPacientes();
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
    return this.solicitacaoService.urlUploadAnexo();
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [],
      tipo: [ 'CANCELAMENTO', Validators.required ],
      email: [null, [ this.validarObrigatoriedade]],
      paciente: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nome: [],
        cpf: [],
        pessoa: [],
        categoria: []
      }),
      dataSolicitacao: [],
      descricao: [null, [ this.validarObrigatoriedade]],
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

  carregarSolicitacao(codigo: number) {
    this.solicitacaoService.buscarPorCodigo(codigo)
      .then(solicitacao => {
       this.formulario.setValue(solicitacao);
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar() {
    if (this.editando) {
      this.atualizarSolicitacao();
    } else {
      this.adicionarSolicitacao();
    }
  }

  adicionarSolicitacao() {
    this.solicitacaoService.adicionar(this.formulario.value)
      .then(solicitacaoAdicionada => {
        this.toasty.success('Solicitação adicionada com sucesso!');

        this.router.navigate(['/solicitacoes', solicitacaoAdicionada.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarSolicitacao() {
    this.solicitacaoService.atualizar(this.formulario.value)
      .then(solicitacao => {
        this.formulario.patchValue(solicitacao);

        this.toasty.success('Solicitação alterada com sucesso!');
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

  novo() {
    this.formulario.reset();

    setTimeout(function() {
      this.solicitacao = new Solicitacao();
    }.bind(this), 1);

    this.router.navigate(['/solicitacoes/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de solicitação: ${this.formulario.get('codigo').value}`);
  }

}
