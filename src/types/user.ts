export type UserRole =
  | "company"
  | "guesthouse"
  | "admin"

export interface AppUser {
    uid: string;
    email: string;
    username: string; // new
    role: UserRole;
    photoURL?: string | null; // optional PFP
}
