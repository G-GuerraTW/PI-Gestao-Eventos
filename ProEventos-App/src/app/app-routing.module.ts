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

// --- IMPORTS ADICIONADOS ---
import { EventoPalestranteComponent } from './components/eventos/evento-palestrante/evento-palestrante.component';
import { GerarChaveComponent } from './components/admin/gerar-chave/gerar-chave.component'; // Ajuste o caminho se necessário
import { AdminGuard } from './service/admin.guard'; // Importe o novo Guard
// --- FIM DOS IMPORTS ---

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},

  { path: 'eventos', redirectTo: 'eventos/lista'},
  { path: 'eventos', component: EventosComponent,
    canActivate: [AuthGuard], // Protege todas as rotas filhas
    children:
      [
        {path: 'detalhes/:id', component: EventoDetalheComponent},
        {path: 'detalhes', component: EventoDetalheComponent},
        {path: 'lista', component: EventoListaComponent},
        {path: 'palestrante', component: EventoPalestranteComponent}
      ]
  },

  {
    path: 'user', component: UserComponent,
    children:
    [
      {path: 'registration', component: RegistrationComponent},
      {path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard]},
      {path: 'login', component: LoginComponent}
    ]
  },

  { path: 'contatos', component: ContatosComponent, canActivate: [AuthGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'palestrantes', component: PalestrantesComponent, canActivate: [AuthGuard]},

  // --- NOVA ROTA DE ADMIN ---
  { 
    path: 'gerar-chave', 
    component: GerarChaveComponent, 
    canActivate: [AuthGuard, AdminGuard] // Protegido por ambos
  },
  // --- FIM DA NOVA ROTA ---
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
