import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomMaterialModule} from './material/material.module';
import {MenuComponent} from './layout/menu/menu.component';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {CustomHttpInterceptor} from './interceptor/custom-http-interceptor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomMaterialModule
  ],
  declarations: [
    MenuComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    CustomMaterialModule,
    MenuComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true }
  ]
})
export class SharedModule { }
