import { Title } from '@angular/platform-browser';
import { Component, OnInit, EventEmitter, Input, Output , Directive, forwardRef, Attribute, OnChanges, SimpleChanges} from '@angular/core';
import { FormControl, AbstractControl, FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { UsuarioService } from './../usuario.service';
import { Usuario } from './../../core/model';


@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css']
})
export class UsuarioCadastroComponent implements OnInit {

  usuario = new Usuario();
  passwordsForm: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
  ) {}


  ngOnInit() {
    this.configurarFormUsuario();

    const codigoUsuario = this.route.snapshot.params['codigo'];

    this.title.setTitle('Novo Usuario');

    /*this.passwordsForm = this.fb.group({
      nome: [''],
      email: [''],
      senha: ['', Validators.compose
        ([Validators.required, Validators.minLength(6), Validators.maxLength(50)])],
      confirmeSenha: ['']
    });*/

    if (codigoUsuario) {
      this.carregarUsuario(codigoUsuario);
    }
  }

  configurarFormUsuario() {
      this.passwordsForm = this.formBuilder.group({
      primeiroNome: [''],
      sobrenome: [''],
      email: [''],
      senha: ['', Validators.compose
        ([Validators.required, Validators.minLength(6), Validators.maxLength(50)])],
      confirmeSenha: ['']
    });

  }

  get editando() {
    return Boolean(this.usuario.codigo)
  }

  carregarUsuario(codigo: number) {
    this.usuarioService.buscarPorCodigo(codigo)
      .then(usuario => {
        this.usuario = usuario;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarUsuario(form);
    } else {
      this.adicionarUsuario(form);
    }
  }

  adicionarUsuario(form: FormControl) {
    this.usuarioService.adicionar(this.usuario)
      .then(usuarioAdicionado => {
        this.toasty.success('Usuário adicionado com sucesso!');
        this.router.navigate(['/usuarios', usuarioAdicionado.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarUsuario(form: FormControl) {
    this.usuarioService.atualizar(this.usuario)
      .then(usuario => {
        this.usuario = usuario;

        this.toasty.success('Usuário alterado com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.usuario = new Usuario();
    }.bind(this), 1);

    this.router.navigate(['/usuarios/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de usuário: ${this.usuario.primeiroNome}`);
  }

}
