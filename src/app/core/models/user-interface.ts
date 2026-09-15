
export interface UserData {
  id: string;
  email: string;
  phone: string;

  email_confirmed_at: string | null;
  last_sign_in_at: string | null;

  created_at: string;
  updated_at: string;

  user_metadata: UserMetadata;
}
export interface UserMetadata {
  name: string;
  job_title: string;
  email_verified: boolean;
  phone_verified: boolean;
}
// user.id
// user.email
// user.phone

// user.user_metadata.name
// user.user_metadata.job_title
// user.user_metadata.email_verified
// user.user_metadata.phone_verified

// user.created_at
// user.updated_at
// user.last_sign_in_at