import { Component, OnInit } from '@angular/core';
import { Projeto } from './projeto';
import { ProjetoService } from './services/projeto.service';
import { FormsModule } from '@angular/forms'; // Importe o FormsModule
import { CommonModule } from '@angular/common'; // Importe o CommonModule

@Component({
  selector: 'app-projeto',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './projeto.component.html',
  styleUrl: './projeto.component.css',
})
export class ProjetoComponent implements OnInit {
  projeto: Projeto[] = [];

  novoProjeto: Projeto= {
    projeto_id: 1,
    projeto_descricao: '',
    projeto_status: 1,
  };

  constructor(private projetoService: ProjetoService) { }

  ngOnInit(): void {
    this.buscarTodosProjetos();
  }

  criarProjeto(): void {
    this.projetoService.post(this.novoProjeto).subscribe(
      novoProjeto => {
        this.projeto.push(novoProjeto);
        this.novoProjeto = { projeto_id: 0, projeto_descricao: '', projeto_status: 1 };
      }
    );
  }

  buscarTodosProjetos(): void {
    this.projetoService.findAll().subscribe(projeto => {
      this.projeto = projeto;
    });
  }

  buscarProjetoId(id: number): void {
    this.projetoService.findOne(id).subscribe(projeto => {
      console.log('Projeto encontrado: ', projeto);
    });
  }

  atualizarDisciplina(id: number, novosDados: any): void {
    this.projetoService.patch(id, novosDados).subscribe(projetoAtualizado => {
      console.log('projeto atualizado: ', projetoAtualizado);
    });
  }

  removerProjeto(id: number): void {
    this.projetoService.remove(id).subscribe(
      () => {
        this.projeto = this.projeto.filter(projeto => projeto.projeto_id !== id);
      }
    );
  }
}
