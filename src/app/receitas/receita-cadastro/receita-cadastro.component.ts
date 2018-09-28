import { element } from 'protractor';
import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';
import * as jsPDF from 'jspdf';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { MedicoService } from './../../medicos/medico.service';
import { PacienteService } from './../../pacientes/paciente.service';
import { MedicacaoService } from './../../medicacoes/medicacao.service';
import { ReceitaService } from './../receita.service';
import { Receita, Medico, Paciente, Medicacao } from './../../core/model';

@Component({
  selector: 'app-receita-cadastro',
  templateUrl: './receita-cadastro.component.html',
  styleUrls: ['./receita-cadastro.component.css']
})
export class ReceitaCadastroComponent implements OnInit {

  medicos = [];
  pacientes = [];
  medicacoes = [];
  medico = new Medico();
  paciente = new Paciente();
  medicacao = new Medicacao();
  receita = new Receita();
  today = new Date();

  constructor(
    private medicoService: MedicoService,
    private pacienteService: PacienteService,
    private medicacaoService: MedicacaoService,
    private receitaService: ReceitaService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {

    const codigoReceita = this.route.snapshot.params['codigo'];

    this.title.setTitle('Nova Receita');

    if (codigoReceita) {
      this.carregarReceita(codigoReceita);
    }

    this.carregarMedicos();
    this.carregarPacientes();
    this.carregarMedicacoes();

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

    doc.save('receita.pdf');

  }

  get editando() {
    return Boolean(this.receita.codigo)
  }

  carregarReceita(codigo: number) {
    this.receitaService.buscarPorCodigo(codigo)
      .then(receita => {
        this.receita = receita;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarReceita(form);
    } else {
      this.adicionarReceita(form);
    }
  }



  adicionarReceita(form: FormControl) {
    this.receitaService.adicionar(this.receita)
      .then(receitaAdicionada => {
        this.toasty.success('Receita adicionada com sucesso!');
        this.router.navigate(['/receitas', receitaAdicionada.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarReceita(form: FormControl) {
    this.receitaService.atualizar(this.receita)
      .then(receita => {
        this.receita = receita;

        this.toasty.success('Receita alterada com sucesso!');
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

  carregarMedicacoes() {
    this.medicacaoService.listarTodas()
      .then(medicacoes => {
        this.medicacoes = medicacoes
          .map(m => ({ label: m.descricao, value: m.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  nova(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.receita = new Receita();
    }.bind(this), 1);

    this.router.navigate(['/receitas/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de receitas: ${this.receita.codigo}`);
  }
}
