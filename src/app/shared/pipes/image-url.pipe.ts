import { Pipe, PipeTransform } from '@angular/core';
import { ImageUrl } from '@core/utils/image-url.util';
import { ImageSize } from '@core/values/image-size.enum';

const imageSize = {
  small: ImageSize.SMALL,
  medium: ImageSize.MEDIUM,
  large: ImageSize.LARGE,
};

type Size = 'small' | 'medium' | 'large';

@Pipe({
  name: 'imageUrl',
})
export class ImageUrlPipe implements PipeTransform {
  transform(value: string, size: Size): string {
    return ImageUrl.get(value, imageSize[size]);
  }
}
