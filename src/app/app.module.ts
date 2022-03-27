import { NgModule } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage-angular';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuModule } from '@shared/components/menu/menu.module';
import { HeaderModule } from '@shared/components/header/header.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'environments/environment';
import { CoreModule } from '@core/core.module';
import { ErrorComponent } from '@shared/pages/error/error.component';
import { HttpClientModule } from '@angular/common/http';
import { RecipeModule } from '@shared/pages/recipe/recipe.module';
import { ErrorModule } from '@shared/pages/error/error.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    CoreModule,
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AppRoutingModule,
    MenuModule,
    ErrorModule,
    RecipeModule,
    HeaderModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
