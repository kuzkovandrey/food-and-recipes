import { UserInfo as Info, UserMetadata } from '@firebase/auth-types';

export interface UserInfo extends Info, UserMetadata {}
