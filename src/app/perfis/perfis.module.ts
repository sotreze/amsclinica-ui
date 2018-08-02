import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputMaskModule } from 'primeng/inputmask';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { PerfisRoutingModule } from './perfis-routing.module';
import { SharedModule } from './../shared/shared.module';
import { PerfilCadastroComponent } from './../perfis/perfil-cadastro/perfil-cadastro.component';
import { PerfilPesquisaComponent } from './../perfis/perfil-pesquisa/perfil-pesquisa.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    InputTextModule,
    SelectButtonModule,
    RadioButtonModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    InputMaskModule,
    DropdownModule,


    SharedModule,
    PerfisRoutingModule
  ],
  declarations: [
    PerfilPesquisaComponent,
    PerfilCadastroComponent
  ],
  exports: []
})
export class PerfisModule { }
