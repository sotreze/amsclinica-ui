import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import {RadioButtonModule} from 'primeng/radiobutton';
import { EditorModule } from 'primeng/editor';
import { InputMaskModule } from 'primeng/inputmask';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { ExamesRoutingModule } from './exames-routing.module';
import { SharedModule } from './../shared/shared.module';
import { ExamePesquisaComponent } from './exame-pesquisa/exame-pesquisa.component';
import { ExameCadastroComponent } from './exame-cadastro/exame-cadastro.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    InputTextModule,
    EditorModule,
    SelectButtonModule,
    RadioButtonModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    InputMaskModule,
    DropdownModule,


    SharedModule,
    ExamesRoutingModule
  ],
  declarations: [
    ExamePesquisaComponent,
    ExameCadastroComponent
  ],
  exports: []
})
export class ExamesModule { }

