export interface User {
  name: string;
  email: string;
  password: string;
  confirm_password?: string;
  dob: string;
  role?: string;
  id?: string;
  idToken: string;
  localId: string;
}

export interface RegisterUser {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

export interface RegisterUserResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
  displayName?: string;
  role?: string;
  id?: string;
}

export interface UserPwdUpdateRequest {
  idToken: string;
  password: string;
  returnSecureToken: boolean;
}

export interface UserPwdUpdateResponse {
  idToken: string;
  localId: string;
  email: string;
  passwordHash: string;
  providerUserInfo: JSON;
  refreshToken: string;
  expiresIn: string;

}
