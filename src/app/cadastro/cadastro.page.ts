import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlunoService } from '../services/aluno.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Aluno } from '../models/aluno.model';

@Component({
  selector: 'app-cadastro',
  templateUrl: 'cadastro.page.html',
  styleUrls: ['cadastro.page.scss']
})
export class CadastroPage implements OnInit {
  
  formAluno: FormGroup;
  aluno: Aluno;

  constructor(private formBuilder: FormBuilder, 
              private alunoService: AlunoService,
              private route: ActivatedRoute,
              private router: Router) {}
  
  ngOnInit() {
    let id = Number(this.route.snapshot.paramMap.get('id')) || 0;
  
    if(id == 0) {
      this.aluno = {id: null, matricula: null, nome: '', email: ''}
    } else {
      //this.alunoService.getAluno(id).toPromise().then( async data => this.aluno = await data );
      this.aluno = {id: null, matricula: null, nome: '', email: ''}
      console.log(id)
    }
    
    this.formAluno = this.formBuilder.group({
      nome: [
        this.aluno.nome, // parametro responsável pelo valor(conteúdo do campo), caso adicione um valor será exibido no input
        [
          Validators.required, // validação de campo requerido
          Validators.minLength(4), // validação de valor minimo de caracteres
          Validators.maxLength(150), // validação de valor maximo de caracteres
          Validators.pattern(/^[a-zA-Z]+$/) // validação de tipo de caracteres (somente aceita letras minusculas e maiusculas)
        ]
      ],
      matricula: [
        this.aluno.matricula, 
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(5),
          Validators.pattern(/^[0-9]+$/) // validação de tipo de caracteres (somente aceita números)
        ]
      ],
      email: [
        this.aluno.email, 
        [
          Validators.required,
          Validators.email // validação de email
        ]
      ]
    });
  }

  adcAluno() {
    // resgatando os valores do campo e fazendo um cast(conversão) para o modelo(template) Aluno
    const novoAluno = this.formAluno.getRawValue() as Aluno;

    this.alunoService
      .addAluno(novoAluno)
      .subscribe(
        () => {
          this.router.navigateByUrl('tabs/lista') // faz um redicionamento para a aba tab3
          this.formAluno.reset(); // limpa os campos do formulário
        },
        error => {
          console.log(error);
          this.formAluno.reset(); // limpa os campos do formulário
        }
      )
  }
}
