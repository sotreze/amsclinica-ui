import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import {RadioButtonModule} from 'primeng/radiobutton';
//import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { ProntuariosRoutingModule } from './prontuarios-routing.module';
import { SharedModule } from './../shared/shared.module';
import { ProntuarioPesquisaComponent } from './prontuario-pesquisa/prontuario-pesquisa.component';
import { ProntuarioCadastroComponent } from './prontuario-cadastro/prontuario-cadastro.component';

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
    FileUploadModule,
    DropdownModule,
    ProgressSpinnerModule,


    SharedModule,
    ProntuariosRoutingModule
  ],
  declarations: [
    ProntuarioPesquisaComponent,
    ProntuarioCadastroComponent
  ],
  exports: []
})
export class ProntuariosModule { }

