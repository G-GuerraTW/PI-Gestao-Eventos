import { Component, inject, TemplateRef, ViewChild } from '@angular/core'; // 1. Imports atualizados
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ChaveService, ChavePalestranteDTO } from 'src/app/service/chave.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'; // 2. Imports do Modal
import { ChavePalestrante } from 'src/models/ChavePalestrante';

@Component({
  selector: 'app-gerar-chave',
  templateUrl: './gerar-chave.component.html',
  styleUrls: ['./gerar-chave.component.scss']
})
export class GerarChaveComponent {
  private chaveService = inject(ChaveService);
  private spinner = inject(NgxSpinnerService);
  private toastR = inject(ToastrService);
  private modalService = inject(BsModalService); // 3. Serviço de modal injetado

  public chaveGeradaObj: ChavePalestrante | null = null;
  public isLoading = false;
  
  // 4. Referências para o Modal
  public modalRef?: BsModalRef;
  // @ViewChild procura pelo nome #modalChave no seu HTML
  @ViewChild('modalChave') modalTemplate!: TemplateRef<ChavePalestrante>; 

  public gerarNovaChave(): void {
    this.isLoading = true;
    this.chaveGeradaObj = null;
    this.spinner.show();

    this.chaveService.gerarChave().subscribe({
      next: (chave) => {
        this.chaveGeradaObj = chave; // 5. Guarda a chave para o modal usar
        this.toastR.success('Chave gerada com sucesso!', 'Sucesso');
        this.spinner.hide();
        this.isLoading = false;
        
        // 6. ABRE O MODAL (o "pop up")
        // Usa o template #modalChave que está no ficheiro HTML
        this.modalRef = this.modalService.show(this.modalTemplate, { 
          class: 'modal-md' 
        });
      },
      error: (err) => {
        console.error('Erro ao gerar chave', err);
        this.toastR.error('Erro ao gerar nova chave.', 'Erro');
        this.spinner.hide();
        this.isLoading = false;
      }
    });
  }

  // 7. Função para fechar o modal (chamada pelo botão "Fechar" no HTML)
  public fecharModal(): void {
    this.modalRef?.hide();
  }

  // A sua função de copiar (vinda do seu prompt anterior)
  public copiarChave(chaveInput: HTMLInputElement): void {
    chaveInput.select();
    chaveInput.setSelectionRange(0, 99999); // Para mobile

    try {
      // document.execCommand é mais seguro em iFrames
      document.execCommand('copy'); 
      this.toastR.info('Chave copiada para a área de transferência!');
    } catch (err) {
      this.toastR.warning('Não foi possível copiar a chave automaticamente.');
    }
  }
}

