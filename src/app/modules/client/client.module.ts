import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListClientComponent } from './list-client/list-client.component';
import { AddEditClientComponent } from './add-edit-client/add-edit-client.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListClientComponent, AddEditClientComponent],
  entryComponents: [AddEditClientComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
})
export class ClientModule {}
