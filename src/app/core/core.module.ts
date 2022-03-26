import { UserStorageService } from '@core/services/user-storage.service';
import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { StorageService } from './services/storage.service';

@NgModule({
  exports: [],
  providers: [AuthGuard, StorageService, UserStorageService],
})
export class CoreModule {}
