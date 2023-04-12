export interface IUser {
  id?: string;
  userPhoto?: string;
  email?: string;
  displayName?: string;
  token?: string;
  createdAt?: string;
  expertise?: string;
  role?: string;
  isApproved?: boolean;
  sections?: [];
  justiFile?: [];
}


export interface IUserRoot {
  count: number;
  data: IUser[];
}
