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
import {GalleriaModule} from 'primeng/galleria';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {PanelModule} from 'primeng/panel';


import { MedicosRoutingModule } from './medicos-routing.module';
import { SharedModule } from './../shared/shared.module';
import { MedicoCadastroComponent } from './medico-cadastro/medico-cadastro.component';
import { MedicoPesquisaComponent } from './medico-pesquisa/medico-pesquisa.component';
import { PessoasModule } from './../pessoas/pessoas.module';

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
    GalleriaModule,
    ScrollPanelModule,
    PanelModule,

    SharedModule,
    MedicosRoutingModule
  ],
  declarations: [
    MedicoCadastroComponent,
    MedicoPesquisaComponent
  ],
  exports: []
})
export class MedicosModule { }
