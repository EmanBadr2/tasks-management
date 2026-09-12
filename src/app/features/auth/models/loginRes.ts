export interface LoginResponse {
  access_token: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  user: User;
}

export interface User {
  // app_metadata: AppMetadata;
  aud: string;
  confirmed_at: string;
  created_at: string;
  email: string;
  email_confirmed_at: string;
  id: string;
  identities: Identity[];
  is_anonymous: boolean;
  last_sign_in_at: string;
  phone: string;
  role: string;
  updated_at: string;
  user_metadata: UserMetadata;
}
export interface AppMetadata {
  provider: string;
  providers: string[];
}
export interface Identity {
  created_at: string;
  email: string;
  id: string;
  identity_data: IdentityData;
  identity_id: string;
  last_sign_in_at: string;
  provider: string;
  updated_at: string;
  user_id: string;
}
export interface IdentityData {
  department: string;
  email: string;
  email_verified: boolean;
  name: string;
  phone_verified: boolean;
  sub: string;
}
export interface UserMetadata {
  department: string;
  email: string;
  email_verified: boolean;
  name: string;
  phone_verified: boolean;
  sub: string;
}