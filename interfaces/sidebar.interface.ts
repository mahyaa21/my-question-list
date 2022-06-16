import { ReactNode } from 'react';

export interface MenuItemInterface {
  title: string;
  icon: ReactNode;
  route: string;
  enable: boolean;
}
