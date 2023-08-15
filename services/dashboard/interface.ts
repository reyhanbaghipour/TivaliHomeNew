type SubMenuItemInterface = {
  id: number;
  parentID: null | number;
  title: string;
  icon: null | string;
  navigation: null | string;
};


export type TGetMenuItemsResponse = {
  status: number;
  id: number;
  error: null | { message: string; errorCode: string };
  entity: {
    id: number;
    parentID: null;
    title: string;
    icon: null;
    navigation: null;
    appAction: null;
    childerns: SubMenuItemInterface[];
  }[];
};

