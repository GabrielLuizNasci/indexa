import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Contato } from './contato';
import { ContatoService } from '../../services/contato.service';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css'
})
export class ContatoComponent {
  @Input({ required: true }) contato!: Contato;

  @Output() exclusaoConcluida = new EventEmitter<void>(); 

  private contatoService = inject(ContatoService);

  excluirContato() {
    if (this.contato && confirm(`Tem certeza que deseja excluir o contato ${this.contato.nome}?`)) {
      this.contatoService.excluirContato(this.contato.id!).subscribe({
        next: () => {
          alert('Contato excluído com sucesso!');
          this.exclusaoConcluida.emit();
        },
        error: (erro: any) => {
          console.error('Erro ao excluir contato:', erro);
          alert('Não foi possível excluir o contato.');
        }
      });
    }
  }
}
