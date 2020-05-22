import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KangarooService } from './services/kangaroo.service';
import { CustomDatePipe } from '../custom-date.pipe';



@NgModule({
  declarations: [CustomDatePipe],
  imports: [
    CommonModule
  ],
  exports: [
    CustomDatePipe,
    CommonModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        KangarooService
      ]
    };
  }
}
