import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
import { CustomValidators } from 'src/app/shared/custom-validators/custom-Validators.directive';
import { User } from 'src/models/User';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})


export class RegistrationComponent implements OnInit {
  private toastR = inject(ToastrService);
    private router = inject(Router);
  private userService = inject(UserService);
  private ngxSpinnerService = inject(NgxSpinnerService);
  private fb = inject(FormBuilder);


  form!: FormGroup;
  public _user!: User;

  ngOnInit() {
    this.validation();
  }

  get f(): any {
    return this.form.controls;
  }

  public validation() {
    this.form = this.fb.group(
      {
        userName: ['', [Validators.required, Validators.minLength(4)]],
        email: ['', [Validators.required, Validators.minLength(4), Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        passwordConfirm: ['', [Validators.required, Validators.minLength(4)]],
        primeiroNome: ['', [Validators.required, Validators.minLength(4)]],
        ultimoNome: ['', [Validators.required, Validators.minLength(4)]],
        termos: [false, [Validators.requiredTrue]],
      },
      { validators: CustomValidators.passwordMatch('password', 'passwordConfirm') } // validador de grupo, mais de um formControll
    );
  }

  onClickRegistrar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // força mostrar erros
      this.toastR.warning('Preencha todos os campos corretamente.');
      return;
    }

    const user = { ...this.form.value };
    delete user.passwordConfirm;
    delete user.termos;

    this.ngxSpinnerService.show();

    this.userService.registerUser(user).subscribe({
      next: () => {
        this.toastR.success('Usuário registrado com sucesso!');
        this.form.reset();
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.toastR.error('Erro ao registrar usuário.');
        console.error(error);
      },
      complete: () => this.ngxSpinnerService.hide()
    });
  }
}
