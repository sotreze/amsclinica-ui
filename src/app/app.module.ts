import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { SegurancaModule } from 'app/seguranca/seguranca.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AgendaCadastroComponent } from './agendas/agenda-cadastro/agenda-cadastro.component';
import { AgendaPesquisaComponent } from './agendas/agenda-pesquisa/agenda-pesquisa.component';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    CoreModule,
    UsuariosModule,
    SegurancaModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
