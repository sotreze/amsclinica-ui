import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { MedicoService } from './../../medicos/medico.service';
import { PacienteService } from './../../pacientes/paciente.service';
import { MedicacaoService } from './../../medicacoes/medicacao.service';
import { ReceitaService } from './../receita.service';
import { Receita, Medico, Paciente, Medicacao } from './../../core/model';

@Component({
  selector: 'app-receita-cadastro',
  templateUrl: './receita-cadastro.component.html',
  styleUrls: ['./receita-cadastro.component.css']
})
export class ReceitaCadastroComponent implements OnInit {

  formulario: FormGroup;
  medicos = [];
  pacientes = [];
  medicacoes = [];
  medico = new Medico();
  paciente = new Paciente();
  medicacao = new Medicacao();
  receita = new Receita();


  constructor(
    private medicoService: MedicoService,
    private pacienteService: PacienteService,
    private medicacaoService: MedicacaoService,
    private receitaService: ReceitaService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {

    const codigoReceita = this.route.snapshot.params['codigo'];

    this.title.setTitle('Nova Receita');

    if (codigoReceita) {
      this.carregarReceita(codigoReceita);
    }

    this.carregarMedicos();
    this.carregarPacientes();
    this.carregarMedicacoes();

  }

  get editando() {
    return Boolean(this.receita.codigo)
  }

  carregarReceita(codigo: number) {
    this.receitaService.buscarPorCodigo(codigo)
      .then(receita => {
        this.receita = receita;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarReceita(form);
    } else {
      this.adicionarReceita(form);
    }
  }



  adicionarReceita(form: FormControl) {
    this.receitaService.adicionar(this.receita)
      .then(receitaAdicionada => {
        this.toasty.success('Receita adicionada com sucesso!');
        this.router.navigate(['/receitas', receitaAdicionada.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarReceita(form: FormControl) {
    this.receitaService.atualizar(this.receita)
      .then(receita => {
        this.receita = receita;

        this.toasty.success('Receita alterada com sucesso!');
        this.atualizarTituloEdicao();
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

  carregarPacientes() {
    this.pacienteService.listarTodos()
      .then(pacientes => {
        this.pacientes = pacientes
          .map(p => ({ label: p.nome, value: p.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarMedicacoes() {
    this.medicacaoService.listarTodas()
      .then(medicacoes => {
        this.medicacoes = medicacoes
          .map(m => ({ label: m.descricao, value: m.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  nova(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.receita = new Receita();
    }.bind(this), 1);

    this.router.navigate(['/receitas/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de receitas: ${this.receita.codigo}`);
  }
}

/*
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { MedicoService } from './../../medicos/medico.service';
import { PacienteService } from './../../pacientes/paciente.service';
import { MedicacaoService } from './../../medicacoes/medicacao.service';
import { ReceitaService } from './../receita.service';
import { Receita } from './../../core/model';

@Component({
  selector: 'app-receita-cadastro',
  templateUrl: './receita-cadastro.component.html',
  styleUrls: ['./receita-cadastro.component.css']
})
export class ReceitaCadastroComponent implements OnInit {

  medicos = [];
  pacientes = [];
  medicacoes = [];
  formulario: FormGroup;

  constructor(
    private medicoService: MedicoService,
    private pacienteService: PacienteService,
    private medicacaoService: MedicacaoService,
    private receitaService: ReceitaService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.configurarFormulario();

    const codigoReceita = this.route.snapshot.params['codigo'];

    this.title.setTitle('Nova Receita');

    if (codigoReceita) {
      this.carregarReceita(codigoReceita);
    }

    this.carregarMedicacoes();
    this.carregarMedicos();
    this.carregarPacientes();
  
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [],
      descricao: [],
      medico: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nome: []
      }),
      paciente: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nome: []
      }),
      medicacao: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        descricao: []
      })
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

  carregarReceita(codigo: number) {
    this.receitaService.buscarPorCodigo(codigo)
      .then(receita => {
       // this.receita = receita;
       // this.formulario.setValue(receita);
       this.formulario.patchValue(receita);
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar() {
    if (this.editando) {
      this.atualizarReceita();
    } else {
      this.adicionarReceita();
    }
  }

  adicionarReceita() {
    this.receitaService.adicionar(this.formulario.value)
      .then(receitaAdicionada => {
        this.toasty.success('Receita adicionada com sucesso!');

        // form.reset();
        // this.receita = new Receita();
        this.router.navigate(['/receitas', receitaAdicionada.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarReceita() {
    this.receitaService.atualizar(this.formulario.value)
      .then(receita => {
        // this.receita = receita;
        // this.formulario.setValue(receita);
        this.formulario.patchValue(receita);

        this.toasty.success('Receita alterada com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarMedicos() {
    return this.medicoService.listarTodos()
      .then(medicos => {
        this.medicos = medicos
          .map(m => ({ label: m.nome, value: m.codigo }));
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

  carregarMedicacoes() {
    this.medicacaoService.listarTodas()
      .then(medicacoes => {
        this.medicacoes = medicacoes
          .map(m => ({ label: m.nome, value: m.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  nova() {
    this.formulario.reset();

    setTimeout(function() {
      this.receita = new Receita();
    }.bind(this), 1);

    this.router.navigate(['/receitas/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.formulario.get('descricao').value}`);
  }
}
*/