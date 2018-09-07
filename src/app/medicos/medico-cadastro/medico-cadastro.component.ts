import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { MedicoService } from './../medico.service';
import { PessoaService } from './../../pessoas/pessoa.service';
import { Medico } from './../../core/model';
import { Pessoa } from './../../core/model';

@Component({
  selector: 'app-medico-cadastro',
  templateUrl: './medico-cadastro.component.html',
  styleUrls: ['./medico-cadastro.component.css']
})
export class MedicoCadastroComponent implements OnInit {

  pessoas = [];
  medico = new Medico();
  pessoa = new Pessoa();
  pt_BR: any;

  constructor(
    private medicoService: MedicoService,
    private pessoaService: PessoaService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {

    const codigoMedico = this.route.snapshot.params['codigo'];

    this.title.setTitle('Novo Médico');

    if (codigoMedico) {
      this.carregarMedico(codigoMedico);
    }

    this.carregarPessoas();

  }

  get editando() {
    return Boolean(this.medico.codigo)
  }

  carregarMedico(codigo: number) {
    this.medicoService.buscarPorCodigo(codigo)
      .then(medico => {
        this.medico = medico;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarMedico(form);
    } else {
      this.adicionarMedico(form);
    }
  }

  adicionarMedico(form: FormControl) {
    this.medicoService.adicionar(this.medico)
      .then(medicoAdicionado => {
        this.toasty.success('Médico adicionado com sucesso!');
        this.router.navigate(['/medicos', medicoAdicionado.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarMedico(form: FormControl) {
    this.medicoService.atualizar(this.medico)
      .then(medico => {
        this.medico = medico;

        this.toasty.success('Médico alterado com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas() {
    this.pessoaService.listarTodas()
      .then(pessoas => {
        this.pessoas = pessoas
          .map(p => ({ label: p.rg, value: p.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.medico = new Medico();
    }.bind(this), 1);

    this.router.navigate(['/medicos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de médicos: ${this.pessoa.nome}`);
  }
}
