import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { UserStorageService } from '@core/services/user-storage.service';
import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { StorageService } from './services/storage.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  exports: [],
  providers: [
    AuthGuard,
    StorageService,
    UserStorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
  }
  ],
})
export class CoreModule {}
