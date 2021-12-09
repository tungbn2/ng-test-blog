export interface ProfileData {
  username: string;
  bio: string;
  image: string | null;
  following: boolean;
}

export interface Profile {
  profile: ProfileData;
}
