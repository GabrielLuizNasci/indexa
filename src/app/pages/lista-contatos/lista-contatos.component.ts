import { Component, OnInit } from '@angular/core';
import { SeparadorComponent } from '../../components/separador/separador.component';
import { ContainerComponent } from '../../components/container/container.component';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ContatoService } from '../../services/contato.service';
import { ContatoComponent } from '../../components/contato/contato.component';
import { CommonModule } from '@angular/common';


interface Contato {
  id: number;
  nome: string;
  telefone: string;
}

@Component({
  selector: 'app-lista-contatos',
  standalone: true,
  imports: [
    CommonModule,
    SeparadorComponent,
    ContainerComponent,
    CabecalhoComponent,
    FormsModule,
    RouterLink,
    ContatoComponent
  ],
  templateUrl: './lista-contatos.component.html',
  styleUrl: './lista-contatos.component.css'
})
export class ListaContatosComponent implements OnInit {
  alfabeto: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  contatos: Contato[] = [];
  filtroPorTexto: string = '';

  constructor(private contatoService: ContatoService){  }

  ngOnInit() {
    this.contatos = this.contatoService.obterContatos();
  }

  filtrarContatosPorTexto(): Contato[] {
    if(!this.filtroPorTexto) {
      return this.contatos
    }
    return this.contatos.filter(contato => {
      return contato.nome.toUpperCase().includes(this.filtroPorTexto.toUpperCase())
    })
  }

  filtrarContatosPorLetra(letra: string): Contato[] {
    const contatosFiltrados = this.filtrarContatosPorTexto().filter(contato => {
      const nomeNormalizado = contato.nome.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return nomeNormalizado.toUpperCase().startsWith(letra.toUpperCase());
    });
    return contatosFiltrados;
  }
}
