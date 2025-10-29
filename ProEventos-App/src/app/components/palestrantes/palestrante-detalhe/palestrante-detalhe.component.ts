import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Palestrante } from 'src/models/Palestrante';
// import { PalestranteService } from 'src/app/service/palestrante.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-palestrante-detalhe',
  templateUrl: './palestrante-detalhe.component.html',
  styleUrls: ['./palestrante-detalhe.component.scss']
})
export class PalestranteDetalheComponent implements OnInit {
  form!: FormGroup;
  idPalestrante: any;
  palestrante!: Palestrante;
  redesSociaisOpcoes = [
    { nome: 'LinkedIn', icon: 'fab fa-linkedin' },
    { nome: 'GitHub', icon: 'fab fa-github' },
    { nome: 'Twitter', icon: 'fab fa-twitter' },
    { nome: 'Instagram', icon: 'fab fa-instagram' },
    { nome: 'Facebook', icon: 'fab fa-facebook' },
    { nome: 'YouTube', icon: 'fab fa-youtube' },
    { nome: 'Website', icon: 'fas fa-globe' }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    // private palestranteService: PalestranteService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.validation();
    this.idPalestrante = this.route.snapshot.paramMap.get('id');
    if (this.idPalestrante) {
      // this.carregarPalestrante();
    }
  }

  public validation(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      miniCurriculo: ['', Validators.required],
      imagemURL: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      redesSociais: this.fb.array([])
    });
  }

  get redesSociais(): FormArray {
    return this.form.get('redesSociais') as FormArray;
  }

  public adicionarRedeSocial(): void {
    this.redesSociais.push(
      this.fb.group({
        nome: ['', Validators.required],
        url: ['', Validators.required]
      })
    );
  }

  public removerRedeSocial(index: number): void {
    this.redesSociais.removeAt(index);
  }

  // public carregarPalestrante(): void {
  //   this.spinner.show();
  //   this.palestranteService.getPalestranteById(this.idPalestrante).subscribe(
  //     (palestrante: Palestrante) => {
  //       this.palestrante = { ...palestrante };
  //       this.form.patchValue(this.palestrante);
  //       // this.palestrante.redesSociais.forEach(redeSocial => {
  //       //   this.redesSociais.push(this.criarRedeSocial(redeSocial));
  //       // });
  //     },
  //     (error: any) => {
  //       this.toastr.error('Erro ao carregar palestrante.', 'Erro!');
  //       console.error(error);
  //     }
  //   ).add(() => this.spinner.hide());
  // }

  public salvarAlteracao(): void {
    this.spinner.show();
    if (this.form.valid) {
      if (this.idPalestrante) {
        // this.palestrante = { id: this.idPalestrante, ...this.form.value };
        // this.palestranteService.updatePalestrante(this.palestrante).subscribe(
        //   () => this.toastr.success('Palestrante atualizado com sucesso!', 'Sucesso!'),
        //   (error: any) => {
        //     this.toastr.error('Erro ao atualizar palestrante.', 'Erro!');
        //     console.error(error);
        //   }
        // ).add(() => this.spinner.hide());
      } else {
        // this.palestrante = { ...this.form.value };
        // this.palestranteService.postPalestrante(this.palestrante).subscribe(
        //   () => {
        //     this.toastr.success('Palestrante salvo com sucesso!', 'Sucesso!');
        //     this.router.navigate(['/palestrantes']);
        //   },
        //   (error: any) => {
        //     this.toastr.error('Erro ao salvar palestrante.', 'Erro!');
        //     console.error(error);
        //   }
        // ).add(() => this.spinner.hide());
      }
    }
  }

  public resetarForm(): void {
    this.location.back();
  }

  get f(): any {
    return this.form.controls;
  }
}
