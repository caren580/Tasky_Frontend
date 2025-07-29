import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  username: string;
  emailAddress: string;
  firstName: string;
  lastName: string;
  isDeleted?: boolean;
  avatarUrl?: string;
  token:string;
}

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  login:  (u: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      login:  (u) => set({ user: u }),
      logout: () => set({ user: null }),
    }),
    {
      name: "tasky_user", 
    }
  )
);