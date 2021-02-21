import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroUsuariosComponent } from './cadastroUsuarios/cadastroUsuarios.component';

const routes: Routes = [
  { path: '', component: CadastroUsuariosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
