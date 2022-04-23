import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresaComponent } from './componentes/empresa/empresa.component'
import { HomeComponent } from './componentes/home/home.component'
import { CatalogoComponent } from  './componentes/catalogo/catalogo.component'
import { PartidasComponent } from  './componentes/partidas/partidas.component'

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'empresa', component: EmpresaComponent},
  { path: 'catalogo', component: CatalogoComponent},
  { path: 'partida', component: PartidasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
