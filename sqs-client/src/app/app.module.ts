import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './pages/home/home.component';
import { MaterialModule } from './material.module';
import { ContactComponent } from './pages/home/contact/contact.component';
import { ClippedShapeVectorComponent } from './components/clipped-shape-vector/clipped-shape-vector.component';
import { HeroComponent } from './pages/home/hero/hero.component';
import { AboutComponent } from './pages/home/about/about.component';
import { FeaturesComponent } from './pages/home/features/features.component';
import { DemoComponent } from './pages/demo/demo.component';
import { ModalComponent } from './components/modal/modal.component';
@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ContactComponent,
        ClippedShapeVectorComponent,
        HeroComponent,
        AboutComponent,
        FeaturesComponent,
        DemoComponent,
        ModalComponent

    ],
    imports: [
        BrowserModule,

        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        AppRoutingModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
    ],
    providers: [
        provideClientHydration(withEventReplay()),

    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
