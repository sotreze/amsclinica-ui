import { element } from 'protractor';
import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';
import * as jsPDF from 'jspdf';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { MedicoService } from './../../medicos/medico.service';
import { PacienteService } from './../../pacientes/paciente.service';
import { ExameService } from './../exame.service';
import { TipoExameService } from './../../tipos-exames/tipo-exame.service';
import { Exame, Medico, Paciente, TipoExame } from './../../core/model';

@Component({
  selector: 'app-exame-cadastro',
  templateUrl: './exame-cadastro.component.html',
  styleUrls: ['./exame-cadastro.component.css']
})
export class ExameCadastroComponent implements OnInit  {

  medicos = [];
  pacientes = [];
  tiposexames = [];
  medico = new Medico();
  paciente = new Paciente();
  tipoexame = new TipoExame();
  exame = new Exame();
  today = new Date();


  constructor(
    private medicoService: MedicoService,
    private pacienteService: PacienteService,
    private exameService: ExameService,
    private tipoExameService: TipoExameService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {

    const codigoExame = this.route.snapshot.params['codigo'];

    this.title.setTitle('Novo Exame');

    if (codigoExame) {
      this.carregarExame(codigoExame);
    }

    this.carregarMedicos();
    this.carregarPacientes();
    this.carregarTiposExames();

  }

  @ViewChild('content') content: ElementRef;

  public downloadPDF() {

    
    let doc = new jsPDF({
      orientation: 'landscape',
      //format: [216, 279]});
      format: [150, 216]});
    let specialElementHandlers = {
      '#editor': function(element, renderer) {
        return true;
      }
    };
    let content = this.content.nativeElement;

    doc.line(0, 30, 216, 30);
    doc.line(0, 130, 216, 130);

    doc.setFontSize(16);
    doc.setFont("courier");
    doc.setFontType("bold");
    doc.setTextColor(51, 122, 183);
    doc.text(100, 10, 'AMS Clínica - Especialidades Integradas', null, null, 'center');

    doc.setFont("times");
    doc.setFontType("normal");
    doc.setFontSize(12);
    doc.text(100, 17, 'mamografia  raio x  teste ergométrico  ultrassom medicina do trabalho', null, null, 'center');

    
    doc.setFont("times");
    doc.setFontType("normal");
    doc.setFontSize(12);
    doc.text(100, 21, 'densitometria óssea  doppler  eletrocardiograma  endoscopia  colonoscopia', null, null, 'center');

    doc.setFont("times");
    doc.setFontType("normal");
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text(100, 140, 'Rua Adolpho Setúbal , 235 - Parque Bela Vista - CEP 13214-820 - Jundiaí - SP', null, null, 'center');


    doc.setFont("times");
    doc.setFontType("normal");
    doc.setFontSize(12);
    doc.setTextColor(51, 122, 183);
    doc.text(100, 145, 'https://amsclinica.cfapps.io/login', null, null, 'center');

    doc.setFontSize(20);
    doc.fromHTML(content.innerHTML, 30, 40, {
      'width': 130,
      'font': 'courier',
      'size':40,
      'elementHandlers': specialElementHandlers
    });

    doc.save('exame.pdf');

  }

  get editando() {
    return Boolean(this.exame.codigo)
  }

  carregarExame(codigo: number) {
    this.exameService.buscarPorCodigo(codigo)
      .then(exame => {
        this.exame = exame;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarExame(form);
    } else {
      this.adicionarExame(form);
    }
  }

  adicionarExame(form: FormControl) {
    this.exameService.adicionar(this.exame)
      .then(exameAdicionado => {
        this.toasty.success('Exame adicionado com sucesso!');
        this.router.navigate(['/exames', exameAdicionado.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarExame(form: FormControl) {
    this.exameService.atualizar(this.exame)
      .then(exame => {
        this.exame = exame;

        this.toasty.success('Exame alterado com sucesso!');
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

  carregarTiposExames() {
    this.tipoExameService.listarTodos()
      .then(tiposexames => {
        this.tiposexames = tiposexames
          .map(t => ({ label: t.nome, value: t.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.exame = new Exame();
    }.bind(this), 1);

    this.router.navigate(['/exames/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de exames: ${this.exame.codigo}`);
  }
}