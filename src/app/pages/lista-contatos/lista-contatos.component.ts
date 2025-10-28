import { Component, inject, OnInit } from '@angular/core';
import { SeparadorComponent } from '../../components/separador/separador.component';
import { ContainerComponent } from '../../components/container/container.component';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ContatoService } from '../../services/contato.service';
import { ContatoComponent } from '../../components/contato/contato.component';
import { CommonModule } from '@angular/common';
import { Contato } from '../../components/contato/contato';

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

  private contatoService = inject(ContatoService);

  ngOnInit() {
    this.carregarContatos();
  }

  carregarContatos() {
    this.contatoService.obterContatos().subscribe({
        next: (contatosRecebidos) => {
            this.contatos = contatosRecebidos;
        },
        error: (erro) => {
            console.error('Erro ao carregar contatos da API:', erro);
            alert('Não foi possível carregar a lista de contatos. Verifique se o servidor Spring Boot está ativo.');
        }
    });
  }

  filtrarContatosPorTexto(): Contato[] {
    if(!this.filtroPorTexto) {
      return this.contatos
    }
    return this.contatos.filter(contato => {
      return contato.nome.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().includes(this.filtroPorTexto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase())
    })
  }

  filtrarContatosPorLetra(letra: string): Contato[] {
    const contatosFiltrados = this.filtrarContatosPorTexto().filter(contato => {
      if (!contato.nome) return false;
      const nomeNormalizado = contato.nome.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return nomeNormalizado.toUpperCase().startsWith(letra.toUpperCase());
    });
    return contatosFiltrados;
  }
}
