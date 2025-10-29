import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContatosComponent } from './components/contatos/contatos.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PalestrantesComponent } from './components/palestrantes/palestrantes.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { EventoListaComponent } from './components/eventos/evento-lista/evento-lista.component';
import { EventoDetalheComponent } from './components/eventos/evento-detalhe/evento-detalhe.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { AuthGuard } from './service/auth.guard';

// 1. IMPORTAR O NOVO COMPONENTE
import { EventoPalestranteComponent } from './components/eventos/evento-palestrante/evento-palestrante.component';
import { PalestranteDetalheComponent } from './components/palestrantes/palestrante-detalhe/palestrante-detalhe.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  { path: 'eventos', redirectTo: 'eventos/lista' },
  {
    path: 'eventos', component: EventosComponent,
    canActivate: [AuthGuard],
    children:
      [
        { path: 'detalhes/:id', component: EventoDetalheComponent },
        { path: 'detalhes', component: EventoDetalheComponent },
        { path: 'lista', component: EventoListaComponent },
        // 2. ADICIONAR A NOVA ROTA AQUI
        { path: 'palestrante', component: EventoPalestranteComponent }
      ]
  },

  {
    path: 'user', component: UserComponent,
    children:
      [
        { path: 'registration', component: RegistrationComponent },
        { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
        { path: 'login', component: LoginComponent }
      ]
  },

  { path: 'contatos', component: ContatosComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'palestrantes', component: PalestrantesComponent, canActivate: [AuthGuard] },
  { path: 'palestrantes/detalhe/:id', component: PalestranteDetalheComponent, canActivate: [AuthGuard] },
  { path: 'palestrantes/detalhe', component: PalestranteDetalheComponent, canActivate: [AuthGuard] },
  // Você tem a rota 'palestrantes' duplicada, pode remover uma
  // { path: 'palestrantes', component: PalestrantesComponent, canActivate: [AuthGuard]}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
