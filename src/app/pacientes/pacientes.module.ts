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

import { PacientesRoutingModule } from './pacientes-routing.module';
import { SharedModule } from './../shared/shared.module';
import { PacientePesquisaComponent } from './paciente-pesquisa/paciente-pesquisa.component';
import { PacienteCadastroComponent } from './paciente-cadastro/paciente-cadastro.component';

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
    PacientesRoutingModule
  ],
  declarations: [
    PacientePesquisaComponent,
    PacienteCadastroComponent
  ],
  exports: []
})
export class PacientesModule { }
