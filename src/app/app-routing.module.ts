import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppRoutes } from '@core/values/app-routes.enum';

const routes: Routes = [
  {
    path: AppRoutes.HOME,
    loadChildren: () =>
      import('./features/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: AppRoutes.AUTH,
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: AppRoutes.SEARCH,
    loadChildren: () =>
      import('./features/search/search.module').then((m) => m.SearchModule),
  },
  {
    path: AppRoutes.FAVORITES,
    loadChildren: () =>
      import('./features/favorites/favorites.module').then((m) => m.FavoritesModule),
  },
  {
    path: AppRoutes.ACCOUNT,
    loadChildren: () =>
      import('./features/account/account.module').then((m) => m.AccountModule),
  },
  {
    path: AppRoutes.ROOT,
    redirectTo: AppRoutes.HOME,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
