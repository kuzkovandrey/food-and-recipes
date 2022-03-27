import { ApiEndpoints } from "@core/values/api-endpoints.enum";
import { ImageSize } from "@core/values/image-size.enum";
import { environment } from "environments/environment";

export class ImageUrl {
  public static get(image: string, size: ImageSize = ImageSize.MEDIUM) {
    return `${environment.sdn}${ApiEndpoints.INGREDIENTS}_${size}/${image}`
  }
}
