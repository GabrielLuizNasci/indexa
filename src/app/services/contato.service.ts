import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contato } from '../components/contato/contato';

const API_URL = 'http://localhost:8080/contatos';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  constructor(private http: HttpClient) { }

  salvarContato(contato: Contato): Observable<Contato> {
    const contatoSemId = { ...contato, id: undefined }; 
    return this.http.post<Contato>(API_URL, contatoSemId);
  }

  obterContatos(): Observable<Contato[]> {
    return this.http.get<Contato[]>(API_URL);
  }

  obterContatoPorId(id: number): Observable<Contato> {
    return this.http.get<Contato>(`${API_URL}/${id}`);
  }

  atualizarContato(id: number, contato: Contato): Observable<Contato> {
    return this.http.put<Contato>(`${API_URL}/${id}`, contato);
  }

  excluirContato(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
}
