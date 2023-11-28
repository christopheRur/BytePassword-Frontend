import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card'
import { MatDialogModule} from '@angular/material/dialog'

import { AppComponent } from './app.component';
import { BytePwdComponent } from './components/byte-pwd/byte-pwd.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    BytePwdComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatCardModule,
    MatDialogModule,
    BrowserModule,HttpClientModule,FormsModule,
    RouterModule.forRoot([{path:'byte-pwd',component: BytePwdComponent},
  ]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
