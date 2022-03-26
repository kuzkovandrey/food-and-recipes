import { UserInfo } from '@core/models/user-info.model';
import { User } from '@firebase/auth-types';

export class UserInfoMapper {
  public static map(user: User): UserInfo {
    const meta = user?.metadata ? user.metadata : {};

    return {
      ...user.metadata,
      displayName: user.displayName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      providerId: user.providerId,
      uid: user.uid,
    };
  }
}
