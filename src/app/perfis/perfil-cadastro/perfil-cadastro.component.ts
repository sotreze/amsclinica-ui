import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { PerfilService } from './../perfil.service';
import { PermissaoService } from './../../permissoes/permissao.service';
import { UsuarioService } from './../../usuarios/usuario.service';
import { Perfil, Usuario, Permissao } from './../../core/model';

import { SelectItem } from 'primeng/components/common/api';

@Component({
  selector: 'app-perfil-cadastro',
  templateUrl: './perfil-cadastro.component.html',
  styleUrls: ['./perfil-cadastro.component.css']
})
export class PerfilCadastroComponent implements OnInit {

  usuarios = [];
  permissoes = [];
  perfil = new Perfil();
  usuario = new Usuario();
  permissao = new Permissao();

  constructor(
    private perfilService: PerfilService,
    private usuarioService: UsuarioService,
    private permissaoService: PermissaoService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {

    const codigoPerfil = this.route.snapshot.params['codigo'];

    this.title.setTitle('Novo Perfil');

    if (codigoPerfil) {
      this.carregarPerfil(codigoPerfil);
    }

    this.carregarUsuarios();
    this.carregarPermissoes();

  }

  get editando() {
    return Boolean(this.perfil.codigo)
  }

  carregarPerfil(codigo: number) {
    this.perfilService.buscarPorCodigo(codigo)
      .then(perfil => {
        this.perfil = perfil;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    //if (this.editando) {
      //this.atualizarPerfil(form);
    //} else {
      this.adicionarPerfil(form);
   // }
  }

  adicionarPerfil(form: FormControl) {
    this.perfilService.adicionar(this.perfil)
      .then(perfilAdicionado => {
        this.toasty.success('Perfil adicionado com sucesso!');
        this.router.navigate(['/perfis', perfilAdicionado.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPerfil(form: FormControl) {
    this.perfilService.atualizar(this.perfil)
      .then(perfil => {
        this.perfil = perfil;

        this.toasty.success('Perfil alterado com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarUsuarios() {
    this.usuarioService.listarTodos()
      .then(usuarios => {
        this.usuarios = usuarios
          .map(u => ({ label: u.primeiroNome + " " + u.sobrenome, value: u.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPermissoes() {
    this.permissaoService.listarTodas()
      .then(permissoes => {
        this.permissoes = permissoes
          .map(p => ({ label: p.descricao, value: p.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.perfil = new Perfil();
    }.bind(this), 1);

    this.router.navigate(['/perfis/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de perfis: ${this.perfil.usuario}`);
  }


}

