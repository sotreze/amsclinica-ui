import { Title } from '@angular/platform-browser';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import {SelectItem} from 'primeng/api';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { AuthService } from 'app/seguranca/auth.service';
import { AgendaFiltro, AgendaService } from './../agenda.service';
import { MedicoService } from './../../medicos/medico.service';
import { PacienteService } from './../../pacientes/paciente.service';
import { Agenda, Medico, Paciente } from './../../core/model';


@Component({
  selector: 'app-agenda-cadastro',
  templateUrl: './agenda-cadastro.component.html',
  styleUrls: ['./agenda-cadastro.component.css']
})
export class AgendaCadastroComponent implements OnInit {

  medicos = [];
  pacientes = [];
  medico = new Medico();
  paciente = new Paciente();
  agenda = new Agenda();

  dataLimite = new Date();
  diaSeguinte = new Date();


  disableHorarioDropdown: boolean;
  horas: SelectItem[];
  selectedHora: string;
  relogio = 'fa fa-fw fa-clock-o';

  today = new Date();
  pt_BR: any;

  imagens: any[];


totalRegistros = 0;
filtro = new AgendaFiltro();
agendas = [];


  constructor(
    private renderer: Renderer2,
    private medicoService: MedicoService,
    private pacienteService: PacienteService,
    public auth: AuthService,
    private agendaService: AgendaService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {
    this.renderer.setStyle(document.body, 'background-color', '#FAFAFA');
   }

  ngOnInit() {

    this.calendarPtbr();

    this.dataLimite.setDate(this.dataLimite.getDate() + 90);
    this.diaSeguinte.setDate(this.diaSeguinte.getDate() + 1);

    this.horarios();

    const codigoAgenda = this.route.snapshot.params['codigo'];

    this.title.setTitle('Nova Agenda');

    if (codigoAgenda) {
      this.carregarAgenda(codigoAgenda);
    }

    this.carregarMedicos();
    this.carregarPacientes();

  }


  get editando() {
    return Boolean(this.agenda.codigo)
  }

  carregarAgenda(codigo: number) {
    this.agendaService.buscarPorCodigo(codigo)
      .then(agenda => {
        this.agenda = agenda;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarAgenda(form);
    } else {
      this.adicionarAgenda(form);
    }
  }

  adicionarAgenda(form: FormControl) {
    this.agendaService.adicionar(this.agenda)
      .then(agendaAdicionada => {
        this.toasty.success('Agenda adicionada com sucesso!');
        this.router.navigate(['/agendas', agendaAdicionada.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarAgenda(form: FormControl) {
    this.agendaService.atualizar(this.agenda)
      .then(agenda => {
        this.agenda = agenda;

        this.toasty.success('Agenda alterada com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarMedicos() {
    this.medicoService.listarTodos()
      .then(medicos => {
        this.medicos = medicos
          .map(m => ({ label: m.nome, value: m.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPacientes() {
    this.pacienteService.listarTodos()
      .then(pacientes => {
        this.pacientes = pacientes
          .map(p => ({ label: p.nome, value: p.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  nova(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.agenda = new Agenda();
    }.bind(this), 1);

    this.router.navigate(['/agendas/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de agendas: ${this.agenda.codigo}`);
  }

  calendarPtbr() {

    this.pt_BR = {
    firstDayOfWeek: 0,
    dayNames: [ 'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado' ],
    dayNamesShort: [ 'dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb' ],
    dayNamesMin: [  'D', 'S', 'T', 'Q', 'Q', 'S', 'S' ],
    monthNames: [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto','Setembro','Outubro','Novembro','Dezembro' ],
    monthNamesShort: [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez' ],
    today: 'Próxima',
    clear: 'Limpar'
    }
  }

  horarios() {
    this.horas = [
        {label: 'Selecione', value: 'Selecione'},
        {label: '08:00', value: '08:00'},
        {label: '08:30', value: '08:30'},
        {label: '09:00', value: '09:00'},
        {label: '09:30', value: '09:30'},
        {label: '10:00', value: '10:00'},
        {label: '10:30', value: '10:30'},
        {label: '11:00', value: '11:00'},
        {label: '11:30', value: '11:30'},
        {label: '12:00', value: '12:00'},
        {label: '13:00', value: '13:00'},
        {label: '13:30', value: '13:30'},
        {label: '14:00', value: '14:00'},
        {label: '14:30', value: '14:30'},
        {label: '15:00', value: '15:00'},
        {label: '15:30', value: '15:30'},
        {label: '16:00', value: '16:00'},
        {label: '16:30', value: '16:30'},
        {label: '17:00', value: '17:00'},
        {label: '17:30', value: '17:30'},
        {label: '18:00', value: '18:00'},
    ];
}


pesquisar(pagina = 0) {
  this.filtro.pagina = pagina;

  this.agendaService.pesquisar(this.filtro)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.agendas = resultado.agendas;
    })
    .catch(erro => this.errorHandler.handle(erro));
}

aoMudarPagina(event: LazyLoadEvent) {
  const pagina = event.first / event.rows;
  this.pesquisar(pagina);
}


}

