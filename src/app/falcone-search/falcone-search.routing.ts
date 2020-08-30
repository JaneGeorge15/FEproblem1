import { Routes, RouterModule } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { FalconeSearchComponent } from './falcone-search.component';
import { NgModule } from '@angular/core';
import { SearchResultComponent } from './search-result/search-result.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/falcone-search', pathMatch: 'full' },
    { path: 'falcone-search', component: FalconeSearchComponent },
    { path: 'search-result', component: SearchResultComponent },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class FalconeRoutingModule {}
