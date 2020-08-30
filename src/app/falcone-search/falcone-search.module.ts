import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';

import { CommonModule } from '@angular/common';
import { FalconeSearchComponent } from './falcone-search.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { FalconeRoutingModule } from './falcone-search.routing';
import { FalconeSearchService } from './falcone-search.service';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [CommonModule, NgSelectModule, FormsModule, ToastrModule.forRoot(), FalconeRoutingModule],
  declarations: [FalconeSearchComponent, SearchResultComponent],
  providers: [FalconeSearchService],
})
export class FalconeSearchModule {}
