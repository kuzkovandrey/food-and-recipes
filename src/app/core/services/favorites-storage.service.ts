import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageKeys } from '@core/values/storage-keys.enum';
import { map, switchMap, tap } from 'rxjs/operators';

type Favorites = Array<number>;

@Injectable()
export class FavoritesStorageService {
  constructor(private storageService: StorageService) {}

  private setFarorite(id: number): Observable<Favorites> {
    return this.getFavorites().pipe(
      map((favorites) => {
        if (!favorites || !favorites.length) favorites = [];

        favorites.push(id);

        return favorites;
      }),
      switchMap((favorites) =>
        this.storageService.set<Favorites>(StorageKeys.FAVORITES, favorites),
      ),
    );
  }

  getFavorites(): Observable<Favorites> {
    return this.storageService.get<Favorites>(StorageKeys.FAVORITES).pipe(
      map((favorites) => favorites ? favorites : []),
      map((favorites) => favorites.filter((id) => !!id)),
    );
  }

  isFavorite(id: number): Observable<boolean> {
    return this.getFavorites().pipe(
      map((favorites) => favorites.find((_id) => _id === id)),
      map((isFavorite) => !!isFavorite),
    );
  }

  private remove(id: number): Observable<Favorites> {
    return this.getFavorites().pipe(
      map((favorites) => favorites.filter((_id) => _id !== id)),
      switchMap((favorites) =>
        this.storageService.set<Favorites>(StorageKeys.FAVORITES, favorites),
      ),
    );
  }

  toggleStatus(id: number, status: boolean): Observable<Favorites> {
    const handler$ = status ? this.setFarorite(id) : this.remove(id);

    return handler$;
  }
}
