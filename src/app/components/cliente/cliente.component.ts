import { ClienteService } from './../../services/cliente.service';
import { Component } from '@angular/core';
import { Cliente } from '../../interfaces/Clientes';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {

  clientesForm : FormGroup = new FormGroup({})
  clientes: Cliente[]=[]
  clienteIdEdicao: string | null = null

  constructor(private clienteService:ClienteService, private formBuilder:FormBuilder) {
    this.clientesForm = formBuilder.group({
      nome: ['', Validators.required],
      telefone: ['']
    })
  }

  list(): void {
    this.clienteService.list().subscribe((resposta) => (this.clientes = resposta))
  }
  //método executado ao inicializar a página
  ngOnInit():void {
    this.list()
  }

  generateRandomString(length: number): string  {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  save() {
    if(this.clientesForm.valid) {
      const formData = this.clientesForm.value

      if(this.clienteIdEdicao) {
        const clienteUpdate: Cliente = {
          id: this.clienteIdEdicao,
          nome: formData.nome,
          telefone: formData.telefone
        }
        this.clienteService.update(this.clienteIdEdicao, clienteUpdate)
        this.clienteIdEdicao = null
        alert('alterado!!!')
      } else {
        const clienteAdd: Cliente = {
          id: this.generateRandomString(6),
          nome: formData.nome,
          telefone: formData.telefone
        }
        // console.log(clienteAdd)
        this.clienteService.add(clienteAdd).subscribe() //chamado a service para inserir
        alert('inserido com sucesso') // enviando feedback ao usuário
      }
    }
      else {
      alert('Por favor, preencha os campos obrigatórios!')
    }
    this.clientesForm.reset() //lipa o form após preenchimento
    this.list() // chama service e recarrega como item inserido
  }

  editar(id: string):void {
  //   //buscando todos os clientes e filtrando pelo id enviado como parametro
  //   const cliente = this.clienteService.list().find(c => c.id == id)
  //   if(cliente) {
  //     this.clienteIdEdicao = cliente.id
  //     //aribuir os valores ao formuário
  //     this.clientesForm.patchValue(
  //       {
  //         nome: cliente.nome,
  //         telefone: cliente.telefone
  //       }
  //     )
  //   }
  }

  remover(id: string):void {
    this.clienteService.remove(id)
  }
}
