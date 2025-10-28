import { Component, inject, OnInit } from '@angular/core';
import { ContainerComponent } from '../../components/container/container.component';
import { Contato } from '../../components/contato/contato';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContatoService } from '../../services/contato.service';
import { MatIconModule } from '@angular/material/icon';
import { SeparadorComponent } from '../../components/separador/separador.component';

@Component({
  selector: 'app-perfil-contato',
  standalone: true,
  imports: [
    CommonModule, 
    SeparadorComponent,
    ContainerComponent,
    RouterLink,
    MatIconModule
  ],
  templateUrl: './perfil-contato.component.html',
  styleUrl: './perfil-contato.component.css'
})
export class PerfilContatoComponent implements OnInit {
  contato: Contato | undefined; 

  private contatoService = inject(ContatoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.obterContatoPeloId();
  }

  obterContatoPeloId() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.contatoService.obterContatoPorId(Number(id)).subscribe({
        next: (contatoCarregado: Contato) => {
          this.contato = contatoCarregado;
          console.log('Contato carregado:', this.contato);
        },
        error: (erro: any) => {
          console.error('Erro ao buscar contato:', erro);
          alert('Não foi possível carregar o perfil do contato.');
          this.router.navigate(['/lista-contatos']);
        }
      });
    } else {
      console.error('ID do contato não encontrado na rota.');
      this.router.navigate(['/lista-contatos']);
    }
  }

  excluirContato() {
    if (this.contato && confirm(`Tem certeza que deseja excluir o contato ${this.contato.nome}?`)) {
      this.contatoService.excluirContato(this.contato.id!).subscribe({
        next: () => {
          alert('Contato excluído com sucesso!');
          this.router.navigate(['/lista-contatos']); 
        },
        error: (erro: any) => {
          console.error('Erro ao excluir contato:', erro);
          alert('Não foi possível excluir o contato.');
        }
      });
    }
  }

  editarContato() {
    this.router.navigate(['/formulario', this.contato?.id]);
  }

  formatarData(data: string | undefined): string {
    if (!data) return 'N/A';
    if (data.includes('-')) {
      const partes = data.split('-');
      return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }
    return data; 
  }
}
