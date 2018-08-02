import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { PacienteService } from './../paciente.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { ProntuarioService } from './../../prontuarios/prontuario.service';
import { PessoaService } from './../../pessoas/pessoa.service';
import { Paciente, Categoria, Pessoa } from './../../core/model';

import { SelectItem } from 'primeng/components/common/api';

@Component({
  selector: 'app-paciente-cadastro',
  templateUrl: './paciente-cadastro.component.html',
  styleUrls: ['./paciente-cadastro.component.css']
})
export class PacienteCadastroComponent implements OnInit {

  pessoas = [];
  categorias = [];
  paciente = new Paciente();
  pessoa = new Pessoa();
  categoria = new Categoria();
  // format = 'CPF';

  constructor(
    private pacienteService: PacienteService,
    private pessoaService: PessoaService,
    private categoriaService: CategoriaService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {

    const codigoPaciente = this.route.snapshot.params['codigo'];

    this.title.setTitle('Novo Paciente');

    if (codigoPaciente) {
      this.carregarPaciente(codigoPaciente);
    }

    this.carregarPessoas();
    this.carregarCategorias();

  }

  get editando() {
    return Boolean(this.paciente.codigo)
  }

  carregarPaciente(codigo: number) {
    this.pacienteService.buscarPorCodigo(codigo)
      .then(paciente => {
        this.paciente = paciente;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarPaciente(form);
    } else {
      this.adicionarPaciente(form);
    }
  }

  adicionarPaciente(form: FormControl) {
    this.pacienteService.adicionar(this.paciente)
      .then(pacienteAdicionado => {
        this.toasty.success('Paciente adicionado com sucesso!');
        this.router.navigate(['/pacientes', pacienteAdicionado.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPaciente(form: FormControl) {
    this.pacienteService.atualizar(this.paciente)
      .then(paciente => {
        this.paciente = paciente;

        this.toasty.success('Paciente alterado com sucesso!');
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

  carregarCategorias() {
    this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias
          .map(p => ({ label: p.nome, value: p.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.paciente = new Paciente();
    }.bind(this), 1);

    this.router.navigate(['/pacientes/novo']);
  }

  atualizarTituloEdicao() {
    // this.title.setTitle(`Edição de funcionários: ${this.pessoa.nome}`);
    this.title.setTitle(`Edição de pacientes: ${this.paciente.nome}`);
  }




}

