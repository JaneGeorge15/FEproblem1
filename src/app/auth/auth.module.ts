import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, NgbModule, AuthRoutingModule],
  declarations: [],
})
export class AuthModule {}
