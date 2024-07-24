export interface IUser {
    id: number;
    name: string;
    phoneNumber: string;
    company: string;
    role: string;
    status: string;
  }

  export interface ITab {
    tabName: string;
    count: number;
  }

  export interface IFilter {
    tab: boolean; //if it is 'all', then it is false
    role: boolean;//if roles is [], then it is false
    searchKey: boolean; //if searchKey is '', then it is false
  }