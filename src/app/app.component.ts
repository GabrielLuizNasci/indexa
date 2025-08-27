import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ContainerComponent } from './components/container/container.component';
import { CabecalhoComponent } from './components/cabecalho/cabecalho.component';
import { SeparadorComponent } from './components/separador/separador.component';
import { ContatoComponent } from './components/contato/contato.component';
import agenda from '../assets/json/agenda.json'

interface Contato {
  id: number;
  nome: string;
  telefone: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ContainerComponent,
    CabecalhoComponent,
    SeparadorComponent,
    ContatoComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  alfabeto: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  contatos: Contato[] = agenda;

  filtrarContatosPorLetra(letra: string): Contato[] {
    return this.contatos.filter(contato => {
      return contato.nome.toUpperCase().startsWith(letra.toUpperCase());
    })
  }
}