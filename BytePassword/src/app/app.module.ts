import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BytePwdComponent } from './components/byte-pwd/byte-pwd.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    BytePwdComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,FormsModule,
    RouterModule.forRoot([{path:'byte-pwd',component: BytePwdComponent},
  ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
