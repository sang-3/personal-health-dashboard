export type ProfileRow = {
  id: string;
  email: string | null;
  name: string;
  created_at?: string;
};

export type Profile = {
  id: string;
  email: string;
  name: string;
  createdAt: string | null;
};

export function mapProfile(profile: ProfileRow): Profile {
  return {
    id: profile.id,
    email: profile.email ?? "",
    name: profile.name,
    createdAt: profile.created_at ?? null,
  };
}
