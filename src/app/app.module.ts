import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { MainContentComponent } from './page/main-content/main-content.component';

@NgModule({
  declarations: [
    AppComponent,
    MainContentComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [
    {provide: "MOCK_API_URL", useValue: "http://5c37c33f7820ff0014d927c5.mockapi.io/msr/" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
