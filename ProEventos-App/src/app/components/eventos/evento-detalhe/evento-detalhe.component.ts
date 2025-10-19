import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Evento } from 'src/models/Evento';
import { EventoService} from 'src/app/service/evento.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private _eventoService = inject(EventoService);
  private toastR = inject(ToastrService);
  private ngxSpinnerService = inject(NgxSpinnerService);

  form!: FormGroup;
  idEvento : any
  evento! : Evento

  ngOnInit(): void {

    this.validation();
    this.idEvento = this.route.snapshot.paramMap.get('id');

    if(this.validaRota())
      {
        this.recuperarEvento();
      }
  }

  private recuperarEvento() {
    if (!this.idEvento) return;

    this._eventoService.getEventoById(this.idEvento).subscribe({
      next: (evento) =>
        {
          this.evento = evento
          this.form.patchValue(evento)
        },
      error: (err) =>
        {
          console.error('Erro ao recuperar evento', err);
        }
    })
  }

 salvarAlteracao() {

    this.ngxSpinnerService.show();

    if(!this.form.valid) this.toastR.warning('Preencha todos os campos corretamente.');

    if(this.validaRota()) {

      this.evento = {...this.form.value, id: this.idEvento}
      this._eventoService.updateEvento(this.idEvento, this.evento).subscribe(
      {
        next: (evento: Evento) =>
          {
            this.evento = evento
            this.form.patchValue(evento)
            this.toastR.success('Registro Atualizado com sucesso!');
          },
        error: (err) =>
        {
          console.error('Erro ao recuperar evento', err);
        },
        complete: () => this.ngxSpinnerService.show()
      })
    }

    this.evento = { ...this.form.value}

    this._eventoService.postEvento(this.evento).subscribe(
      {
        next: (evento: Evento) =>
        {
            this.evento = evento;
            this.form.patchValue(evento);
            this.toastR.success('Evento cadastrado com sucesso !');
        },
        error: (err) => console.error('Erro ao registrar Evento: ', err),
        complete: () => this.ngxSpinnerService.hide()
      })

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
    });
  }

  resetarForm() {
    if(this.validaRota()) this.form.patchValue(this.evento)
      else this.form.reset();
  }

}
