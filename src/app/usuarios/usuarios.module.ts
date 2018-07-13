import { RouterModule } from '@angular/router';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputMaskModule } from 'primeng/inputmask';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { SharedModule } from './../shared/shared.module';
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';
import { UsuarioPesquisaComponent } from './usuario-pesquisa/usuario-pesquisa.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputMaskModule,

    SharedModule,
    UsuariosRoutingModule
  ],
  declarations: [
    UsuarioCadastroComponent,
    UsuarioPesquisaComponent
  ],
  exports: []
})
export class UsuariosModule { }

