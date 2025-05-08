import { Categoria } from './../interfaces/Categoria';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiUrl = 'http://localhost:3000/categorias';
  categorias: Categoria[] = []

  // injeção da dependência do http
  constructor(private http: HttpClient) {

  }

  add(categoria: Categoria) {
    const httpHeaders =
    {
      headers: {
        'Content-type': 'application/json',
      },
    };

    return this.http.post(this.apiUrl, categoria, httpHeaders);
  }
  list(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl) as Observable<Categoria[]>
  }
}

