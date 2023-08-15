import { type } from 'os';

export type IntershipHistoryItem = {
  actNo: string | null;
  date: string | null;
  internshipsClassID: number | null;
  internshipsClassName: string | null;
  personID: number | null;
  personName: string | null;
  internshipsClassWorkPersonsID: number | null;
};
export type ClassHistoryItem = {
  actNo: string | null;
  date: string | null;
  className: string | null;
  personID: number | null;
  expireDate: string | null;
  resultName: string | null;
};

export type IntershipClassItem = {
  id: number;
  title: string;
  displayTitle: null;
  titleEn: string | null;
};

export type AreaItem = {
  id: number;
  title: string;
  displayTitle: null;
  titleEn: string;
};

export type TGetIntershipHistoryResponse = {
  status: number;
  id: number;
  error: null | { message: string; errorCode: string };
  entity: IntershipHistoryItem[];
};
export type TGetClassHistoryResponse = {
  status: number;
  id: number;
  error: null | { message: string; errorCode: string };
  entity: ClassHistoryItem[];
};

export type TGetIntershipClass = {
  status: number;
  id: number;
  error: null | { message: string; errorCode: string };
  entity: IntershipClassItem[];
};
export type TGetArea = {
  status: number;
  id: number;
  error: null | { message: string; errorCode: string };
  entity: AreaItem[];
};
