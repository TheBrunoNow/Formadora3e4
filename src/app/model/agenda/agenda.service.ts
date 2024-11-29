import { Injectable } from '@angular/core';
import { Agenda } from './agenda';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  private url = 'http://localhost:5000/api'

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Agenda[]>(`${this.url}/buscaragenda`)
  }

  addNew(user: any): Observable<any> {
    return this.http.post(`${this.url}/adicionarnovo`, user);
  }


  updateUser(user: Agenda) {
    return this.http.put(`${this.url}/atualizar/${user.id}`, user);
  }


  deleteUser(id: number) {
    return this.http.delete(`${this.url}/deletar/${id}`);
  }
}
