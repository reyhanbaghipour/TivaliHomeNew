import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';

export type NextPageWithLayout = NextPage<unknown, Record<string, never>> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export enum DEVICE {
  MOBILE = 'MOBILE',
  DESKTOP = 'DESKTOP',
}

export const DEVICESIZES = {
  XSUP: '(min-width: 	320px)',
  SMUP: '(min-width: 	640px)',
  MDUP: '(min-width: 768px)',
  LGUP: '(min-width: 992px)',
  XLUP: '(min-width: 1024px)',
  XXLUP: '(min-width: 1280px)',
};
