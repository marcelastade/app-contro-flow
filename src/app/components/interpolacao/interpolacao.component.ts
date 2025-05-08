import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-interpolacao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './interpolacao.component.html',
  styleUrl: './interpolacao.component.css',
})
export class InterpolacaoComponent {
  name: string = 'Thiago';
  age: number = 41;
  job = 'Developer';
  hobbies = ['Music', 'Sports', 'Movies'];
  car = { make: 'Ford', model: 'Fiesta' };
  //para exibir uma imagem busque uma imagem na web e salve dentro da pasta assets
  imageUrl = '../../../assets/transferir.jpg';

}
