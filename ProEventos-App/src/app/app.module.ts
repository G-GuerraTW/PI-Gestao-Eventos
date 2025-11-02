import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { PalestrantesComponent } from './components/palestrantes/palestrantes.component';
import { ContatosComponent } from './components/contatos/contatos.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NavComponent } from './shared/nav/nav.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EventoService } from 'src/app/service/evento.service';
import { DateTimeFormatPipe } from './helpers/DateTimeFormat.pipe';
import { TituloComponent } from './shared/titulo/titulo.component';
import { EventoDetalheComponent } from './components/eventos/evento-detalhe/evento-detalhe.component';
import { EventoListaComponent } from './components/eventos/evento-lista/evento-lista.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { EventoPalestranteComponent } from './components/eventos/evento-palestrante/evento-palestrante.component';
import { PalestranteDetalheComponent } from './components/palestrantes/palestrante-detalhe/palestrante-detalhe.component';
import { GerarChaveComponent } from './components/admin/gerar-chave/gerar-chave.component';
import { MinhasEntradasComponent } from './components/eventos/minhas-entradas/minhas-entradas.component';
import { UserViewComponent } from './components/user-view/user-view.component';
// import { HomeInitialComponent } from './components/home-initial/home-initial.component'; // Removed import

@NgModule({
  declarations: [
    AppComponent,
    EventosComponent,
    PalestrantesComponent,
    ContatosComponent,
    DashboardComponent,
    PerfilComponent,
    TituloComponent,
    NavComponent,
    DateTimeFormatPipe,
    ContatosComponent,
    DashboardComponent,
    EventoDetalheComponent,
    EventoListaComponent,
    UserComponent,
    LoginComponent,
    RegistrationComponent,
    EventoPalestranteComponent,
    PalestranteDetalheComponent,
    GerarChaveComponent,
    MinhasEntradasComponent,
    UserViewComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CollapseModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule,
    CommonModule,
    ModalModule.forRoot(),
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot(
      {
        timeOut: 3000,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
        progressBar: true
      }),
      NgxMaskDirective
  ],
  providers: [EventoService, provideNgxMask()],
  bootstrap: [AppComponent]
})
export class AppModule { }
