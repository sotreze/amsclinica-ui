import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RadioButtonModule} from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { FuncionariosRoutingModule } from './funcionarios-routing.module';
import { SharedModule } from './../shared/shared.module';
import { FuncionarioCadastroComponent } from './funcionario-cadastro/funcionario-cadastro.component';
import { FuncionarioPesquisaComponent } from './funcionario-pesquisa/funcionario-pesquisa.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    RadioButtonModule,
    InputTextModule,
    CalendarModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    InputMaskModule,
    SelectButtonModule,
    DropdownModule,

    SharedModule,
    FuncionariosRoutingModule
  ],
  declarations: [
    FuncionarioCadastroComponent,
    FuncionarioPesquisaComponent
  ],
  exports: []
})
export class FuncionariosModule { }
