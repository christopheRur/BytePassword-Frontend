import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card'
import {MatIconModule} from '@angular/material/icon';
import { MatDialogModule} from '@angular/material/dialog'

import { AppComponent } from './app.component';
import { BytePwdComponent } from './components/byte-pwd/byte-pwd.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    BytePwdComponent,
    LoginComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'byte-pwd', component: BytePwdComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirect to login by default
      // Add more routes if needed
    ],{initialNavigation:'enabledNonBlocking'}),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
