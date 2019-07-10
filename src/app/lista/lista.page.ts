import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlunoService } from '../services/aluno.service';
import { Router } from '@angular/router';
import { Aluno } from '../models/aluno.model';

@Component({
  selector: 'app-lista',
  templateUrl: 'lista.page.html',
  styleUrls: ['lista.page.scss']
})
export class ListaPage {

  private alunos: Aluno[];

  constructor(private alunoService: AlunoService,
    private router: Router) {}

    
  ionViewWillEnter(): void {
    this.listaAlunos();
  }

  listaAlunos() {
      this.alunoService.getAlunos().subscribe(
      alunosDB => this.alunos = alunosDB,
      erroDB => console.log(erroDB)
    );
  }

  deleteAluno(id: number) {
    this.alunoService.deleteAluno(id).subscribe(
      () => this.listaAlunos()
    );
  }

  atualizaAluno(id: number) {
    this.router.navigateByUrl(`tabs/cadastro/${id}`)
  }
}
