import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../../shared/custom-validators/custom-Validators.directive'
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent implements OnInit {

private fb = inject(FormBuilder);
formularioPerfil! : FormGroup;

ngOnInit(): void {
  this.criarFormulario();
}

get f(): any {
  return this.formularioPerfil.controls;
}

criarFormulario(): void {
  this.formularioPerfil = this.fb.group({
    titulo:['', Validators.required],
    primeiroNome:['', Validators.required],
    ultimoNome:['', Validators.required],
    email:['', [Validators.required, Validators.email]],
    telefone:['', Validators.required],
    funcao:['', Validators.required],
    descricao:[''],
    senha:['', Validators.required],
    confirmarSenha:['',Validators.required]
  },
  {
    validators: CustomValidators.passwordMatch('senha', 'confirmarSenha')
  })
}


}
