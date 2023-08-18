import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainPageComponent } from './main-page/main-page.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TimelineModule } from 'primeng/timeline';
import { ExperienceComponent } from './experience/experience.component';
import { EducationComponent } from './education/education.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SkillsComponent } from './skills/skills.component';
import { ContactComponent } from './contact/contact.component';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainPageComponent,
    ExperienceComponent,
    EducationComponent,
    SkillsComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CardModule,
    ButtonModule,
    TimelineModule,
    NgxSpinnerModule.forRoot({ type: 'square-jelly-box' }),
    InputTextModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
