/** user's role */
export type Role = 'guest' | 'admin';

export interface LoginParams {
  /** 用户名 */
  username: string;
  /** 用户密码 */
  password: string;
}

export interface LoginResult {
  token: string;
  username: string;
  role: Role;
  email: string;
  avatar: string;
}

export interface LogoutParams {
  token: string;
}

export interface LogoutResult {}
