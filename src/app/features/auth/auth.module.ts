import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    IonicModule,
    ReactiveFormsModule
  ],
  declarations: [
    AuthComponent,
    AuthFormComponent,
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
  ],
})
export class AuthModule {}
