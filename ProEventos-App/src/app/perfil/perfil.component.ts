import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/models/User';
import { UserService } from 'src/app/service/user.service';
import { CustomValidators } from '../shared/custom-validators/custom-Validators.directive';
import { UserDTO } from 'src/models/DTOs/UserDTO';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  formularioPerfil!: FormGroup;
  user!: UserDTO;

  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.criarFormulario();
    this.carregarUsuario();
  }

  private criarFormulario(): void {
    this.formularioPerfil = this.fb.group({
      titulo: ['', Validators.required],
      primeiroNome: ['', Validators.required],
      ultimoNome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      funcao: ['', Validators.required],
      descricao: [''],
      senha: [''],
      confirmarSenha: ['']
    }, {
      validators: CustomValidators.passwordMatch('senha', 'confirmarSenha')
    });
  }

  private carregarUsuario(): void {
    this.userService.getUser().subscribe(
      (user: UserDTO) => {
        this.user = user;
        this.formularioPerfil.patchValue(this.user);
      },
      (error: any) => {
        console.error('Erro ao carregar usuário', error);
      }
    );
  }

  get f(): any {
    return this.formularioPerfil.controls;
  }

  onSubmit(): void {
    if (this.formularioPerfil.valid) {
      const { senha, confirmarSenha, ...rest } = this.formularioPerfil.value;
      const userUpdate = { ...this.user, ...rest };

      if (senha) {
        userUpdate.password = senha;
      }

      this.userService.updateUser(userUpdate).subscribe(
        (user: UserDTO) => {
          this.authService.setCurrentUser(user);
          this.formularioPerfil.reset(user);
          this.carregarUsuario();
          console.log('Usuário atualizado com sucesso');
        },
        (error: any) => {
          console.error('Erro ao atualizar usuário', error);
        }
      );
    }
  }

  public resetForm(event: any): void {
    event.preventDefault();
    this.formularioPerfil.reset();
    this.carregarUsuario();
  }
}
