import { ScheduleModule } from 'primeng/schedule';
import { SelectItem } from 'primeng/components/common/api';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import {RadioButtonModule} from 'primeng/radiobutton';
import { EditorModule } from 'primeng/editor';
import { InputMaskModule } from 'primeng/inputmask';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { Ng2OrderModule } from 'ng2-order-pipe';

import { AgendasRoutingModule } from './agendas-routing.module';
import { SharedModule } from './../shared/shared.module';
import { AgendaPesquisaComponent } from './agenda-pesquisa/agenda-pesquisa.component';
import { AgendaCadastroComponent } from './agenda-cadastro/agenda-cadastro.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    Ng2OrderModule,

    ScheduleModule,
    InputTextModule,
    CalendarModule,
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
    AgendasRoutingModule
  ],
  declarations: [
    AgendaPesquisaComponent,
    AgendaCadastroComponent
  ],
  exports: []
})
export class AgendasModule { }

