import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModules } from './styles/app.material.module';
import { StoreModule } from '@ngrx/store';
import { movieReducer, userReducer } from './store/reducers/movie.reducer';
import { MovieListComponent } from './movie-list/movie-list.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { MovieEffects } from './store/effects/movie.effect';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryService } from './services/in-memory.service';
import { metaReducers, reducers } from './store/reducer';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { HomeComponent } from './home/home.component';
import { MovieComponent } from './movie/movie.component';
import { Serializer } from '@angular/compiler';
import { RouterSerializer } from './store/routerSerializer';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MovieListComponent,
    HomeComponent,
    MovieComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModules,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryService),
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: false,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      },

      metaReducers,
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([MovieEffects]),
    StoreRouterConnectingModule.forRoot({
      serializer: RouterSerializer,
    }),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
