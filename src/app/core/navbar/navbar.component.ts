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
  itemsUsuario: MenuItem[];
  activeItem: MenuItem;


  constructor(
    public auth: AuthService,
    private logoutService: LogoutService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.items = [
      {label: 'Agenda', routerLink: ['agendas'], icon: 'far fa-address-book'},
      {label: 'Receita', routerLink: ['receitas/nova'], icon: 'fas fa-align-center'},
      {label: 'Exame', routerLink: ['exames/novo'], icon: 'fas fa-briefcase'},
      {label: 'Prontuário', routerLink: ['prontuarios'], icon: 'fas fa-book'},
      {label: 'Médico', routerLink: ['medicos'], icon: 'fas fa-user-md'},
      {label: 'Solicitação', routerLink: ['solicitacoes'], icon: 'far fa-plus-square'},
      {label: 'Painel', routerLink: ['dashboard'], icon: 'fas fa-binoculars'},
      {label: 'Relatório', routerLink: ['relatorios/lancamentos'], icon: 'far fa-clone'}
  ];

    this.itemsUsuario = [
      {label: 'Agenda', routerLink: ['agendas'], icon: 'far fa-address-book'},
      {label: 'Médico', routerLink: ['medicos'], icon: 'fas fa-user-md'},
      {label: 'Solicita', routerLink: ['solicitacoes/nova'], icon: 'far fa-plus-square'},
];

  this.activeItem = this.items[1];
  }

  logout() {
    this.logoutService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
