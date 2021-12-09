export interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string | null;
}

export interface AuthUser {
  user: User;
}

export interface EmailAndPass {
  email: string;
  password: string;
}
export interface loginData {
  user: EmailAndPass;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}
export interface NewUser {
  user: RegisterData;
}

export interface UpdateUserData {
  email?: string;
  bio?: string;
  image?: string;
  username?: string;
  password?: string;
}

export interface UpdateUser {
  user: UpdateUserData;
}
