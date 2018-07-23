import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { LogoutService } from './../../seguranca/logout.service';
import { ErrorHandlerService } from './../error-handler.service';
import { AuthService } from './../../seguranca/auth.service';

import { TabMenuModule, MenuItem } from 'primeng/primeng';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  exibindoMenu = false;

  items: MenuItem[];
  activeItem: MenuItem;

  constructor(
    public auth: AuthService,
    private logoutService: LogoutService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.items = [
      {label: 'Painel de Controle', routerLink: ['dashboard'], icon: 'fas fa-binoculars'},
      {label: 'Consultas', routerLink: ['lancamentos'], icon: 'fa-search'},
      //{label: 'Nova', routerLink: ['lancamentos/novo'], icon: 'fa-edit'},
      {label: 'Pessoal', routerLink: ['pessoas'], icon: 'fas fa-address-card'},
      {label: 'Usuários', routerLink: ['usuarios'], icon: 'fas fa-user-circle'},
      {label: 'Funcionários', routerLink: ['funcionarios'], icon: 'fas fa-users'},
      {label: 'Pacientes', routerLink: ['pacientes'], icon: 'fas fa-briefcase'},
      {label: 'Prontuários', routerLink: ['prontuarios'], icon: 'fas fa-briefcase'},
      {label: 'Médicos', routerLink: ['medicos'], icon: 'fas fa-briefcase'},
      {label: 'Receitas', routerLink: ['receitas'], icon: 'fas fa-briefcase'},
      {label: 'Exames', routerLink: ['exames'], icon: 'fas fa-briefcase'},
      {label: 'Agendas', routerLink: ['agendas'], icon: 'fas fa-briefcase'},
      {label: 'Relatórios', routerLink: ['relatorios/lancamentos'], icon: 'far fa-clone'},
      //{label: 'Social', icon: 'fa-twitter'}
  ];

  this.activeItem = this.items[2];
  }

  logout() {
    this.logoutService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
