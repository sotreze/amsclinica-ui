import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';
import {MenuItem} from 'primeng/api';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { AuthService } from './../../seguranca/auth.service';
import { PessoaService } from './../pessoa.service';
import { Pessoa } from './../../core/model';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  /*tipos = [
    { label: 'Paciente', value: 'PACIENTE' },
    { label: 'Funcionário', value: 'FUNCIONARIO' },
  ];*/

 
  pessoa = new Pessoa();
  estados: any[];
  cidades: any[];
  estadoSelecionado: number;

  items: MenuItem[];

  constructor(
    public auth: AuthService,
    private pessoaService: PessoaService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    const codigoPessoa = this.route.snapshot.params['codigo'];

    this.title.setTitle('Nova Pessoa');

    this.carregarEstados();

    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }


    this.items = [

      /*{label: 'Angular.io', icon: 'fa fa-link', url: 'http://angular.io'},*/
      {label: 'Médico', url: 'https://amsclinica.cfapps.io/medicos/novo', icon: 'fas fa-user-md'},
      {label: 'Paciente', url: 'https://amsclinica.cfapps.io/pacientes/novo', icon: 'far fa-address-book'},
      {label: 'Funcionário', url: 'https://amsclinica.cfapps.io/funcionarios/novo', icon: 'fa fa-link'}
  ];


  }

  carregarEstados() {
    this.pessoaService.listarEstados().then(lista => {
      this.estados = lista.map(uf => ({ label: uf.nome, value: uf.codigo }));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCidades() {
    this.pessoaService.pesquisarCidades(this.estadoSelecionado).then(lista => {
      this.cidades = lista.map(c => ({ label: c.nome, value: c.codigo }));
    })
    .catch(erro => this.errorHandler.handle(erro));
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
    return Boolean(this.pessoa.codigo)
  }


  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
      .then(pessoa => {
        this.pessoa = pessoa;

        this.estadoSelecionado = (this.pessoa.endereco.cidade) ?
                this.pessoa.endereco.cidade.estado.codigo : null;

        if (this.estadoSelecionado) {
          this.carregarCidades();
        }

        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

 adicionarPessoa(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
      .then(pessoaAdicionada => {
        this.toasty.success('Pessoa adicionada com sucesso!');
        this.router.navigate(['/pessoas', pessoaAdicionada.codigo]);
        this.toasty.info('Atribuir pelo RG o perfil desejado');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPessoa(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
      .then(pessoa => {
       this.pessoa = pessoa;

        this.toasty.success('Pessoa alterada com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  nova(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.pessoa = new Pessoa();
    }.bind(this), 1);

    this.router.navigate(['/pessoas/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }

}
