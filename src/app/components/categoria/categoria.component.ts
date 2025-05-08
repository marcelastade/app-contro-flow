import { Component } from '@angular/core';
import { Categoria } from '../../interfaces/Categoria';
import { CategoriaService } from './../../services/categoria.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent {

  categoriasForm : FormGroup = new FormGroup({})
  categorias: Categoria[]=[]

  constructor(private categoriaService:CategoriaService, private formBuilder:FormBuilder) {
    this.categoriasForm = formBuilder.group({
      nome: ['', Validators.required],
      descricao: [''],
      ativa: ['', Validators.required]
    })
  }

  list(): void {
    this.categoriaService.list().subscribe((resposta) => (this.categorias = resposta))
  }
  //método executado ao inicializar a página
  ngOnInit():void {
    this.list()
  }

  generateRandomString(length: number): string  {
    const characters = '0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  save() {
    if(this.categoriasForm.valid) {
      const formData = this.categoriasForm.value

        const categoriaAdd: Categoria = {
          id: parseInt(this.generateRandomString(6)),
          nome: formData.nome,
          descricao: formData.descricao,
          ativa: formData.ativa
        }
        // console.log(clienteAdd)
        this.categoriaService.add(categoriaAdd).subscribe() //chamado a service para inserir
        alert('inserido com sucesso') // enviando feedback ao usuário
      }
      else {
      alert('Por favor, preencha os campos obrigatórios!')
    }
    this.categoriasForm.reset() //lipa o form após preenchimento
    this.list() // chama service e recarrega como item inserido
  }
}
