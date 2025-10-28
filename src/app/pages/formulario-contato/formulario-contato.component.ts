import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ContainerComponent } from '../../components/container/container.component';
import { SeparadorComponent } from '../../components/separador/separador.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ContatoService } from '../../services/contato.service';
import { first } from 'rxjs';
import { Contato } from '../../components/contato/contato';


@Component({
  selector: 'app-formulario-contato',
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    SeparadorComponent,
    ReactiveFormsModule,
    RouterLink,
    DatePipe
  ],
  templateUrl: './formulario-contato.component.html',
  styleUrl: './formulario-contato.component.css'
})
export class FormularioContatoComponent implements OnInit {
  contatoForm!: FormGroup;

  private contatoService = inject(ContatoService);
  private router = inject(Router);

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  inicializarFormulario(){
    this.contatoForm = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]),
      telefone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      dataAniversario: new FormControl(''), 
      redesSociais: new FormControl(''),
      observacoes: new FormControl(''),
    })
  }

  salvarContato(){
    if (this.contatoForm.invalid) {
      this.contatoForm.markAllAsTouched();
      return;
    }
    
    const contato: Contato = {
      nome: this.contatoForm.get('nome')?.value,
      telefone: this.contatoForm.get('telefone')?.value,
      email: this.contatoForm.get('email')?.value,
      dataAniversario: this.contatoForm.get('dataAniversario')?.value,
      redesSociais: this.contatoForm.get('redesSociais')?.value,
      observacoes: this.contatoForm.get('observacoes')?.value,
    };
    
    this.contatoService.salvarContato(contato).pipe(first()).subscribe({
      next: (contatoSalvo) => {
        console.log('Contato salvo com sucesso:', contatoSalvo); 
        this.router.navigate(['/lista-contatos']); 
      },
      error: (erro) => {
        console.error('Erro ao salvar contato. Verifique o backend e CORS.', erro);
        alert('Erro ao salvar contato: ' + erro.message); 
      }
    });
  }

  cancelar(){
    this.router.navigate(['/lista-contatos']);
  }
}
