import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { CustomValidators } from '../../../shared/custom-validators/custom-Validators.directive'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent implements OnInit, OnDestroy {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  formularioPerfil! : FormGroup;
  private userSubscription!: Subscription;

  ngOnInit(): void {
    this.criarFormulario();
    this.carregarUsuario();
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  get f(): any {
    return this.formularioPerfil.controls;
  }

  private carregarUsuario(): void {
    this.userSubscription = this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.formularioPerfil.patchValue(user);
      } else {
        this.formularioPerfil.reset();
      }
    });
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
