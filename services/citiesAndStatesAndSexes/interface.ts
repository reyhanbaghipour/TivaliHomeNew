export type TGetStatesQueryPayload = {
  title?: string;
  pageSize?: string;
  currentPage?: string;
  sort?: string;
  sortDir?: string;
};

export type TGetStatesResponse = {
  status: number;
  id: number;
  error: null | { message: string; errorCode: string };
  entity: {
    id: number;
    title: string;
    titleEn: string;
  }[];
};

export type TGetCitiesQueryPayload = {
  AreaId: string;
  Title?: string;
  PageSize?: string;
  CurrenPage?: string;
  sort?: string;
  sortDir?: string;
};

export type TGetCitiesResponse = {
  status: number;
  id: number;
  error: null | { message: string; errorCode: string };
  entity: {
    id: number;
    title: string;
    titleEn: null | string;
  }[];
  total: 1;
};

export type TGetSexesQueryResponse = {
  status: number;
  id: number;
  error: null | { message: string; errorCode: string };
  entity: {
    id: number;
    title: string;
    titleEn: null | string;
  }[];
  total: 2;
};
