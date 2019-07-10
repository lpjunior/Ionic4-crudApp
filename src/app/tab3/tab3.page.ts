import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlunoService } from '../services/aluno.service';
import { Router } from '@angular/router';
import { Aluno } from '../models/aluno.model';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  private alunos: Aluno[];

  constructor(private alunoService: AlunoService,
    private router: Router) {}

    
  ngOnInit(): void {
    this.listaAlunos();
  }

  listaAlunos() {
      this.alunoService.getAlunos().subscribe(
      alunosDB => this.alunos = alunosDB,
      erroDB => console.log(erroDB)
    );
  }
}
