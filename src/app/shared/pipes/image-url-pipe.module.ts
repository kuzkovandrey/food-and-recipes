import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageUrlPipe } from './image-url.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [ImageUrlPipe],
  exports: [ImageUrlPipe],
})
export class ImageUrlPipeModule { }
