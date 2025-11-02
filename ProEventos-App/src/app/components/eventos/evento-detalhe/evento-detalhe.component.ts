import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from 'src/models/Evento';
import { EventoService} from 'src/app/service/evento.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private location = inject(Location);
  private _eventoService = inject(EventoService);
  private toastR = inject(ToastrService);
  private ngxSpinnerService = inject(NgxSpinnerService);
  private router = inject(Router)

  form!: FormGroup;
  idEvento : any
  evento! : Evento

  ngOnInit(): void {
    this.validation();
    this.idEvento = this.route.snapshot.paramMap.get('id');

    if (this.validaRota()) {
      this.ngxSpinnerService.show();
      this.recuperarEvento();
    }
  }

  private recuperarEvento(): void {
    if (!this.idEvento) {
      this.ngxSpinnerService.hide();
      return;
    }

    this._eventoService.getEventoById(this.idEvento).subscribe({
      next: (evento: Evento) => {
        this.evento = { ...evento };
        if (this.evento.dataEvento) {
          this.evento.dataEvento = new Date(this.evento.dataEvento);
        }
        this.form.patchValue(this.evento);
        this.toastR.info('Dados do evento carregados.', 'Carregado!');
      },
      error: (err) => {
        console.error('Erro ao recuperar evento', err);
        this.toastR.error('Erro ao carregar o evento.', 'Erro!');
        this.ngxSpinnerService.hide();
      },
      complete: () => {
        this.ngxSpinnerService.hide();
      }
    });
  }

  salvarAlteracao() {
    this.ngxSpinnerService.show();

    if (!this.form.valid) {
      this.toastR.warning('Preencha todos os campos corretamente.');
      this.ngxSpinnerService.hide();
      return;
    }

    if (this.validaRota()) {
      this.evento = { id: this.idEvento, ...this.form.value };

      this._eventoService.updateEvento(this.idEvento, this.evento).subscribe({
        next: (evento: Evento) => {
          this.form.patchValue(evento);
          this.toastR.success('Registro Atualizado com sucesso!');
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Erro ao ATUALIZAR evento', err);
          this.toastR.error('Erro ao atualizar o evento.', 'Erro!');
        },
      }).add(() => this.ngxSpinnerService.hide());

    } else {
      this.evento = { ...this.form.value };

      this._eventoService.postEvento(this.evento).subscribe({
        next: (evento: Evento) => {
          this.toastR.success('Evento cadastrado com sucesso!');
          this.router.navigate([`/eventos/detalhes/${evento.id}`]);
        },
        error: (err) => {
          console.error('Erro ao REGISTRAR Evento: ', err);
          this.toastR.error('Erro ao cadastrar o evento.', 'Erro!');
        },
      }).add(() => this.ngxSpinnerService.hide());
    }
  }

  private validaRota(): boolean {
    return this.idEvento != null;
  }

  get f(): any {
    return this.form.controls;
  }

  public validation(): void
  {
    this.form = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(120)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      imagemURL: ['', Validators.required],
      valor: ['', [Validators.required, Validators.min(0)]],
    });
  }

  resetarForm() {
    this.location.back();
  }

}
