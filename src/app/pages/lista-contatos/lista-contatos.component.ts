import { Component } from '@angular/core';
import { SeparadorComponent } from '../../components/separador/separador.component';
import { ContainerComponent } from '../../components/container/container.component';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import agenda from '../../../assets/json/agenda.json'

interface Contato {
  id: number;
  nome: string;
  telefone: string;
}

@Component({
  selector: 'app-lista-contatos',
  standalone: true,
  imports: [
    SeparadorComponent,
    ContainerComponent,
    CabecalhoComponent,
    FormsModule,
    RouterLink
  ],
  templateUrl: './lista-contatos.component.html',
  styleUrl: './lista-contatos.component.css'
})
export class ListaContatosComponent {
  alfabeto: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  contatos: Contato[] = agenda;
  filtroPorTexto: string = '';

  filtrarContatosPorTexto(): Contato[] {
    if(!this.filtroPorTexto) {
      return this.contatos
    }
    return this.contatos.filter(contato => {
      return contato.nome.toUpperCase().includes(this.filtroPorTexto.toUpperCase())
    })
  }

  filtrarContatosPorLetra(letra: string): Contato[] {
    return this.filtrarContatosPorTexto().filter(contato => {
      return contato.nome.toUpperCase().startsWith(letra.toUpperCase());
    })
  }
}
