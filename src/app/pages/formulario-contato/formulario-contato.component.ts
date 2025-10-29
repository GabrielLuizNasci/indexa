import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ContainerComponent } from '../../components/container/container.component';
import { SeparadorComponent } from '../../components/separador/separador.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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

  idContato: number | null = null;
  titulo: string = 'Adicionar Contato';

  private contatoService = inject(ContatoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.inicializarFormulario();
    this.carregarContatoParaEdicao();
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

  carregarContatoParaEdicao() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.idContato = +id; 
        this.titulo = 'Editar Contato'; 
        this.contatoService.obterContatoPorId(this.idContato).pipe(first()).subscribe({
          next: (contato: Contato) => {
            this.contatoForm.patchValue({
              id: contato.id,
              nome: contato.nome,
              telefone: contato.telefone,
              email: contato.email,
              dataAniversario: this.formatarDataParaInput(contato.dataAniversario),
              redesSociais: contato.redesSociais,
              observacoes: contato.observacoes
            });
          },
          error: (erro) => {
            console.error('Erro ao buscar contato para edição:', erro);
            alert('Não foi possível carregar os dados do contato.');
            this.router.navigate(['/lista-contatos']);
          }
        });
      }
    });
  }

  formatarDataParaInput(data: string | undefined): string | null {
    if (!data) return null;
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(data, 'yyyy-MM-dd');
  }

  salvarOuEditarContato(){
    if (this.contatoForm.invalid) {
      this.contatoForm.markAllAsTouched();
      return;
    }
    const contato: Contato = this.contatoForm.value as Contato;
    this.contatoService.editarOuSalvarContato(contato).pipe(first()).subscribe({
      next: (contatoSalvo: Contato) => {
        console.log('Operação de contato realizada com sucesso:', contatoSalvo); 
        this.router.navigate(['/lista-contatos']); 
      },
      error: (erro: any) => {
        console.error('Erro na operação de contato. Verifique o backend.', erro);
        alert('Erro ao salvar/editar contato: ' + erro.message); 
      }
    });
  }

  cancelar(){
    this.router.navigate(['/lista-contatos']);
  }
}
