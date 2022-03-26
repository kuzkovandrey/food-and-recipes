import { AppRoutes } from './app-routes.enum';

export type MenuRoutesType = {
  path: AppRoutes;
  label: string;
  iconName: string;
  isAuth?: boolean;
};

export const MenuRoutes: MenuRoutesType[] = [
  {
    path: AppRoutes.HOME,
    label: 'Home',
    iconName: 'home-outline',
  },
  {
    path: AppRoutes.SEARCH,
    label: 'Search',
    iconName: 'search',
    isAuth: true,
  },
  {
    path: AppRoutes.FAVORITES,
    label: 'Favorites',
    iconName: 'heart-outline',
    isAuth: true,
  },
  {
    path: AppRoutes.ACCOUNT,
    label: 'Account',
    iconName: 'person-outline',
    isAuth: true,
  },
  {
    path: AppRoutes.AUTH,
    label: 'Log in',
    iconName: 'log-in-outline',
    isAuth: false,
  },
];

