import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { UserStorageService } from '@core/services/user-storage.service';
import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { StorageService } from './services/storage.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { QuotaCountInterceptor } from './interceptors/quota-count.interceptor';
import { QuotaService } from './services/quota.service';
import { RecipesApi } from './api/recipes.api';
import { RecipesService } from './services/recipes.service';
import { FavoritesStorageService } from './services/favorites-storage.service';
import { ModalService } from './services/modal.service';
import { UidService } from './services/uid.service';
import { LoadingService } from './services/loading.service';
import { ToastService } from './services/toast.service';
import { SearchParamsService } from '@features/search/services/search-params.service';
import { SearchService } from './services/search.service';

@NgModule({
  providers: [
    AuthGuard,
    StorageService,
    UserStorageService,
    QuotaService,
    RecipesService,
    FavoritesStorageService,
    ModalService,
    UidService,
    LoadingService,
    ToastService,
    SearchParamsService,
    SearchService,
    RecipesApi,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: QuotaCountInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {
  constructor() {}
}
