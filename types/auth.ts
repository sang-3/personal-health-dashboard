export interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  type: "user" | "seller";
  _id: string;
  email: string;
  name: string;
  image?: string;
  token?: Token;
}

export type UserCreateForm = Pick<User, "name" | "email" | "type"> & {
  password: string;
  attach?: FileList;
};

export type LoginForm = Pick<User, "email"> & {
  password: string;
};

export interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  resetUser: () => void;
}
