import { Cliente } from './../interfaces/Clientes';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = 'http://localhost:3000/clientes';
  clientes: Cliente[] = []

  // injeção da dependência do http
  constructor(private http: HttpClient) {

  }
  list(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl) as Observable<Cliente[]>
  }

  remove (id:string) {
    const cliente = this.clientes.find (c => c.id == id)

    if(cliente) {
      const index = this.clientes.indexOf(cliente)
      this.clientes.splice(index,1)
    }
  }

  add(cliente: Cliente) {
    const httpHeaders =
    {
      headers: {
        'Content-type': 'application/json',
      },
    };

    return this.http.post(this.apiUrl, cliente, httpHeaders);
  }

  update(id:string, cliente:Cliente) {
    const index = this.clientes.findIndex (c=>c.id==id)

    if(index !== -1) {
      this.clientes[index]= {
        ...this.clientes[index],
        ...cliente
      }
    }
  }
}

